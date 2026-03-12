public class ArrayIndexList<E> implements IndexList<E> {

    private E[] A;
    private int capacity = 16;
    private int size = 0;

    @SuppressWarnings("unchecked")
    public ArrayIndexList() {
        A = (E[]) new Object[capacity];
    }

    public void add(int r, E e)
        throws IndexOutOfBoundsException {
        checkIndex(r, A.length + 1);
        if (size == capacity) {
            capacity *= 2;
            @SuppressWarnings("unchecked")
            E[] B = (E[]) new Object[capacity];
            for(int i=0; i<size; i++)
                B[i] = A[i];
            A = B;
        }
        for (int i = size-1; i >= r; i--)
            A[i+1] = A[i];
        A[r] = e;
        size++;
    }

    public E remove(int r)
        throws IndexOutOfBoundsException {
        checkIndex(r, A.length);
        E temp = A[r];
        for (int i = r; i < size-1; i++)
            A[i] = A[i+1];
        size--;
        return temp;
    }
    private void checkIndex(int r, int n) {
        if (r < 0 || r >= n) {
            throw new IndexOutOfBoundsException("Índice fora dos limites: " + r);
        }
    }
}