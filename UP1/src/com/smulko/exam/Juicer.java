package com.smulko.exam;

import java.io.*;
import java.util.*;

class ComparatorCount implements Comparator<Juice>{
    public int compare(Juice j1, Juice j2){
        if(j1.getComponents().size() > j2.getComponents().size()){
            return 1;
        }
        if(j1.getComponents().size() < j2.getComponents().size()){
            return -1;
        }
        return 0;
    }
}

public class Juicer implements Runnable {

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
                ArrayList<String> bufComponents = new ArrayList<String>();
                String line = bf.readLine();
                StringTokenizer st = new StringTokenizer (line," \n");
                Juice juice = new Juice();
                while(st.hasMoreTokens()){
                    String token = st.nextToken();
                    allComponents1.add(token.toLowerCase());
                    allComponents2.add(token);
                    bufComponents.add(token.toLowerCase());
                }
                juice.setComponents(bufComponents);
                Collections.sort(juice.getComponents());
                juices.add(juice);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void print(){
        try {
            PrintWriter pw1 = new PrintWriter("juice1.out");
            PrintWriter pw2 = new PrintWriter("juice2.out");
            PrintWriter pw3 = new PrintWriter("juice3.out");
            for ( String s : allComponents1) {
                pw1.println(s);
            }
            for (String s : allComponents2) {
                pw2.println(s);
            }
            pw3.print(min);
            pw1.close();
            pw2.close();
            pw3.close();
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
            ArrayList<String> inJuicer =  juices.get(currentIndex).getComponents();
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

    public void run(){
        Collections.sort(allComponents2);
    }

}
