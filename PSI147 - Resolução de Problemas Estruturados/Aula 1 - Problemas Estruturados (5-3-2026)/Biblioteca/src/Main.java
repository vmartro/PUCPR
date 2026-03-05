public class Main {

    public static void main(String[] args) {

        // --- Criando Ebooks ---
        Ebook ebook1 = new Ebook("Clean Code", "Robert C. Martin", "PDF");
        Ebook ebook2 = new Ebook("O Senhor dos Anéis", "J.R.R. Tolkien", "EPUB");
        Ebook ebook3 = new Ebook("Effective Java", "Joshua Bloch", "MOBI");

        // --- Criando Vídeos Digitais ---
        VideoDigital video1 = new VideoDigital("Introdução ao Java", "Marcos Silva", 45, "1080p");
        VideoDigital video2 = new VideoDigital("Design Patterns na Prática", "Ana Souza", 90, "4K");

        // -----------------------------------------------
        System.out.println("===========================================");
        System.out.println("       BIBLIOTECA DIGITAL - CATÁLOGO       ");
        System.out.println("===========================================\n");

        // --- Exibindo descrições ---
        System.out.println("📚 EBOOKS DISPONÍVEIS:");
        System.out.println("  " + ebook1.descricao());
        System.out.println("  " + ebook2.descricao());
        System.out.println("  " + ebook3.descricao());

        System.out.println("\n🎥 VÍDEOS DISPONÍVEIS:");
        System.out.println("  " + video1.descricao());
        System.out.println("  " + video2.descricao());

        // -----------------------------------------------
        System.out.println("\n===========================================");
        System.out.println("           SIMULANDO DOWNLOADS             ");
        System.out.println("===========================================\n");

        ebook1.baixar();
        ebook2.baixar();
        ebook3.baixar();
        video1.baixar();

        // -----------------------------------------------
        System.out.println("\n===========================================");
        System.out.println("        SIMULANDO VISUALIZAÇÕES            ");
        System.out.println("===========================================\n");

        video1.visualizar();
        video2.visualizar();

        // -----------------------------------------------
        System.out.println("\n===========================================");
        System.out.println("   USANDO POLIMORFISMO COM AS INTERFACES   ");
        System.out.println("===========================================\n");

        Baixavel[] itensBaixaveis = { ebook1, ebook2, video2 };
        System.out.println(">> Baixando todos os itens baixáveis:");
        for (Baixavel item : itensBaixaveis) {
            item.baixar();
        }

        System.out.println();
        Visualizavel[] itensVisualizaveis = { video1, video2 };
        System.out.println(">> Visualizando todos os itens visualizáveis:");
        for (Visualizavel item : itensVisualizaveis) {
            item.visualizar();
        }
    }
}