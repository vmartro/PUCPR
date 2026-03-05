public class VideoDigital extends ItemBibliotecaDigital implements Baixavel, Visualizavel {

    private int duracaoMinutos;
    private String resolucao;

    public VideoDigital(String titulo, String autor, int duracaoMinutos, String resolucao) {
        super(titulo, autor);
        this.duracaoMinutos = duracaoMinutos;
        this.resolucao = resolucao;
    }

    public int getDuracaoMinutos() {
        return duracaoMinutos;
    }

    public String getResolucao() {
        return resolucao;
    }

    @Override
    public String descricao() {
        return "🎬 Vídeo: \"" + getTitulo() + "\" | Autor/Diretor: " + getAutor()
                + " | Duração: " + duracaoMinutos + " min | Resolução: " + resolucao;
    }

    @Override
    public void baixar() {
        System.out.println("⬇️  Baixando vídeo \"" + getTitulo() + "\" em " + resolucao + "... Download concluído!");
    }

    @Override
    public void visualizar() {
        System.out.println("▶️  Reproduzindo vídeo \"" + getTitulo() + "\" (" + duracaoMinutos + " min) em " + resolucao + "...");
    }
}