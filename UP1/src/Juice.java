import java.util.ArrayList;
import java.util.Collections;

/**
 * Created by User on 13.02.2015.
 */
public class Juice {
    private ArrayList<String> components;
    private int count;

    Juice(){
        this.components = new ArrayList<String>();

    }
    public void setComponents(ArrayList<String> components) {
        this.components = components;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public ArrayList<String> getComponents() {
        return components;
    }

    public int getCount() {
        return count;
    }

    public void sort (){
        Collections.sort(components);
    }
    @Override
    public String toString() {
        return  this.count + "\n" + this.components.toString();
    }
}
