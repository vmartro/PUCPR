public interface IndexList<E>{

    public void add(int i, E e)
        throws IndexOutOfBoundsException;

    public E remove(int i)
        throws IndexOutOfBoundsException;
}
