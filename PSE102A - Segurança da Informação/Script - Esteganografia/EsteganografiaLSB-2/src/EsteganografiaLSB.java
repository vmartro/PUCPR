import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;

public class EsteganografiaLSB {

    public static void main(String[] args) {

        try {
            // 1. CONFIGURAÇÃO DE DIRETÓRIOS
            //String dirSrc = "source/";
            String dirRes = "resultados/";
            Files.createDirectories(Paths.get(dirRes));

            // Arquivos de Entrada (Devem estar em /src)
            //File capaOriginal = new File(dirSrc + "capa3.jpg");
            //File imagemSegredo = new File(dirSrc + "segredo3.jpg");

            // Arquivo Intermediário (O que será enviado/analisado)
            File stegoGerado = new File(dirRes + "stego_final.png");

            // Arquivo Final (O que foi recuperado da esteganografia)
            File arquivoRecuperado = new File(dirRes + "recuperado.png");

            //System.out.println("=== ETAPA 1: OCULTAÇÃO (REMETENTE) ===");
            //if (!capaOriginal.exists() || !imagemSegredo.exists()) {
                //throw new Exception("Certifique-se de que 'capa.png' e 'segredo.png' estão na pasta /src");
            //}

            //esconderArquivo(capaOriginal, imagemSegredo, stegoGerado);
            //System.out.println("[INFO] Arquivo steganografado criado: " + stegoGerado.getPath());

            System.out.println("\n=== ETAPA 2: EXTRAÇÃO (RECEPTOR/PERITO) ===");
            System.out.println("[INFO] Analisando arquivo: " + stegoGerado.getName());

            // A extração lê o arquivo que acabou de ser gerado na Etapa 1
            byte[] dadosExtraidos = extrairDados(stegoGerado);

            // Salva os bytes recuperados no disco
            Files.write(arquivoRecuperado.toPath(), dadosExtraidos);

            System.out.println("[SUCESSO] O segredo foi extraído e salvo em: " + arquivoRecuperado.getPath());
            System.out.println("Verifique a pasta /resultados para comparar os arquivos.");

        } catch (Exception e) {
            System.err.println("\n[ERRO CRÍTICO]: " + e.getMessage());
        }
    }

    /**
     * Lógica de Ocultação: Transforma o segredo em bits e espalha nos LSBs da capa.
     */

    public static void esconderArquivo(File capaFile, File segredoFile, File destino) throws Exception {
        BufferedImage imgOriginal = ImageIO.read(capaFile);

        // Normalização para RGB puro (32-bit sem Alpha ou Perfis Complexos)
        BufferedImage capa = new BufferedImage(imgOriginal.getWidth(), imgOriginal.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D g = capa.createGraphics();
        g.drawImage(imgOriginal, 0, 0, null);
        g.dispose();

        byte[] bytesSegredo = Files.readAllBytes(segredoFile.toPath());
        int tamanho = bytesSegredo.length;

        // Payload: [4 bytes tamanho] + [bytes do segredo]
        byte[] payload = new byte[tamanho + 4];
        payload[0] = (byte) ((tamanho >> 24) & 0xFF);
        payload[1] = (byte) ((tamanho >> 16) & 0xFF);
        payload[2] = (byte) ((tamanho >> 8) & 0xFF);
        payload[3] = (byte) (tamanho & 0xFF);
        System.arraycopy(bytesSegredo, 0, payload, 4, tamanho);

        // Validação de Capacidade
        if (payload.length * 8 > (long) capa.getWidth() * capa.getHeight() * 3) {
            throw new Exception("Imagem capa insuficiente para o tamanho do segredo!");
        }

        int pIdx = 0, bIdx = 0;
        outer:
        for (int y = 0; y < capa.getHeight(); y++) {
            for (int x = 0; x < capa.getWidth(); x++) {
                int rgb = capa.getRGB(x, y);
                int[] canais = {(rgb >> 16) & 0xFF, (rgb >> 8) & 0xFF, rgb & 0xFF};

                for (int i = 0; i < 3; i++) {
                    if (pIdx < payload.length) {
                        int bit = (payload[pIdx] >> (7 - bIdx)) & 1;
                        canais[i] = (canais[i] & ~1) | bit; // Troca o LSB
                        bIdx++;
                        if (bIdx == 8) { bIdx = 0; pIdx++; }
                    } else break outer;
                }
                capa.setRGB(x, y, (canais[0] << 16) | (canais[1] << 8) | canais[2]);
            }
        }
        ImageIO.write(capa, "png", destino);
    }

    /**
     * Lógica de Extração: Varre os LSBs da imagem e reconstrói o array de bytes original.
     */

    public static byte[] extrairDados(File stegoFile) throws Exception {
        BufferedImage img = ImageIO.read(stegoFile);
        List<Byte> listaBytes = new ArrayList<>();
        byte byteAtual = 0;
        int bIdx = 0, tamanhoSegredo = -1;

        outer:
        for (int y = 0; y < img.getHeight(); y++) {
            for (int x = 0; x < img.getWidth(); x++) {
                int rgb = img.getRGB(x, y);
                int[] canais = {(rgb >> 16) & 0xFF, (rgb >> 8) & 0xFF, rgb & 0xFF};

                for (int canal : canais) {
                    byteAtual = (byte) ((byteAtual << 1) | (canal & 1));
                    bIdx++;

                    if (bIdx == 8) {
                        listaBytes.add(byteAtual);
                        bIdx = 0; byteAtual = 0;

                        if (tamanhoSegredo == -1 && listaBytes.size() == 4) {
                            tamanhoSegredo = ((listaBytes.get(0) & 0xFF) << 24) |
                                    ((listaBytes.get(1) & 0xFF) << 16) |
                                    ((listaBytes.get(2) & 0xFF) << 8) |
                                    (listaBytes.get(3) & 0xFF);
                        }
                        if (tamanhoSegredo != -1 && listaBytes.size() == tamanhoSegredo + 4) break outer;
                    }
                }
            }
        }

        if (tamanhoSegredo <= 0) throw new Exception("Não foi possível identificar dados ocultos.");

        byte[] resultado = new byte[tamanhoSegredo];
        for (int i = 0; i < tamanhoSegredo; i++) {
            resultado[i] = listaBytes.get(i + 4);
        }
        return resultado;
    }
}