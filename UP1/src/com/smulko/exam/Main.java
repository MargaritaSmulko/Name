package com.smulko.exam;

public class Main {
    public static void main (String[] args){
        Juicer juicer = new Juicer();
        juicer.readText();
        juicer.minWashing();
        Thread thread = new Thread(juicer);
        thread.start();
        juicer.print();
    }
}
