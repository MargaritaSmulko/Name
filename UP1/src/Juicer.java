import java.io.*;
import java.util.*;

/**
 * Created by User on 13.02.2015.
 */
class MyComparator implements Comparator<String>{

    @Override
    public int compare(String o1, String o2) {
        return o1.compareTo(o2);
    }
}
class ComparatorCount implements Comparator<Juice>{
    public int compare(Juice j1, Juice j2){
        if(j1.getCount() > j2.getCount()){
            return 1;
        }
        if(j1.getCount() < j2.getCount()){
            return -1;
        }
        return 0;
    }
}
public class Juicer {

    private ArrayList<Juice> juices = new ArrayList<Juice>();
    private LinkedHashSet<String> allComponents1 = new LinkedHashSet<String>();
    private ArrayList<String> allComponents2 = new ArrayList<String>();
    private int min = 0;

    public void readText(){
        String file = "juice.in";
        try {
            BufferedReader bf = new BufferedReader(new FileReader(file));
            while (bf.ready())
            {
                ArrayList<String> comp = new ArrayList<String>();
                String line = bf.readLine();
                StringTokenizer st = new StringTokenizer (line," \n");
                Juice juice = new Juice();
                juice.setCount(st.countTokens());
                while(st.hasMoreTokens()){
                    String token = st.nextToken();
                    allComponents1.add(token.toLowerCase());
                    allComponents2.add(token);
                    comp.add(token.toLowerCase());
                }
                juice.setComponents(comp);
                juice.sort();
                juices.add(juice);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void printComponents(){
        try {
            PrintWriter pw1 = new PrintWriter("juice1.out");
            PrintWriter pw2 = new PrintWriter("juice2.out");
            PrintWriter pw3 = new PrintWriter("juice3.out");
            Object [] mas = allComponents1.toArray();
            for (int i = 0; i < allComponents1.size(); i++) {
                pw1.println(mas[i].toString());
            }
            for (int i = 0; i < allComponents2.size(); i++) {
                pw2.println(allComponents2.get(i));
            }
            pw3.print(min);
            pw3.close();
            pw1.close();
            pw2.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void minWashing(){
        Collections.sort(juices, new ComparatorCount());
        for (int i = 0; i < juices.size() - 1 ; i++){
            if(juices.get(i).getComponents().equals(juices.get(i+1).getComponents()) ){
                juices.remove(i+1);
                i--;
            }
        }
        while(juices.size() != 0){
            int currentIndex =0;
            ArrayList<String> inJuicer = new ArrayList<String>();
            inJuicer = juices.get(currentIndex).getComponents();
            for (int i = 1; i < juices.size(); i++){
                if (juices.get(i).getComponents().containsAll(inJuicer)){
                    juices.remove(currentIndex);
                    currentIndex = i-1;
                    inJuicer = juices.get(currentIndex).getComponents();
                    i--;
                }
            }
            juices.remove(currentIndex);
            min ++;
        }
    }

    public void sort(){
        Collections.sort(allComponents2, new  MyComparator());
    }

}
