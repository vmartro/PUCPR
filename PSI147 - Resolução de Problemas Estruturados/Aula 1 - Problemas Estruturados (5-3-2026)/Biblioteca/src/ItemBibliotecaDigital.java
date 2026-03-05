public abstract class ItemBibliotecaDigital {

    private String titulo;
    private String autor;

    public ItemBibliotecaDigital(String titulo, String autor) {
        this.titulo = titulo;
        this.autor = autor;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public abstract String descricao();
}