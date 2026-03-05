public class Ebook extends ItemBibliotecaDigital implements Baixavel {

    private String formato;

    public Ebook(String titulo, String autor, String formato) {
        super(titulo, autor);
        this.formato = formato;
    }

    public String getFormato() {
        return formato;
    }

    @Override
    public String descricao() {
        return "📖 Ebook: \"" + getTitulo() + "\" | Autor: " + getAutor() + " | Formato: " + formato;
    }

    @Override
    public void baixar() {
        System.out.println("⬇️  Baixando ebook \"" + getTitulo() + "\" no formato " + formato + "... Download concluído!");
    }
}
