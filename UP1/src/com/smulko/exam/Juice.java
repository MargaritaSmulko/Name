package com.smulko.exam;

import java.util.ArrayList;

public class Juice {

    private ArrayList<String> components;

    public Juice() {
        this.components = new ArrayList<String>();
    }

    public void setComponents(ArrayList<String> components) {
        this.components = components;
    }

    public ArrayList<String> getComponents() {
        return components;
    }

}
