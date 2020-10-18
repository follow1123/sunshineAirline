package com.yang.utils;

import org.apache.ibatis.session.SqlSession;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * @auther YF
 * @create 2020-07-30-20:48
 */
public class PojoUtils {

    private static String showTables = "show tables";

    private static String desTable = "describe ";

    private static String packageName;

    private static StringBuilder sb;

    private static ArrayList<String> fieldNames;

    private static ArrayList<String> fieldTypes;

    private static String empty = " ";

    private static String table = "\t";

    private static String nextLine = "\n";

    static {
        String name = PojoUtils.class.getPackage().getName();
        String substring = name.substring(0, name.lastIndexOf(".") + 1);
        packageName = substring + "pojo";
    }

    private static String getPath(){
        return packageName.replace(".", "/");
    }

    public static void initPojo(Connection connection, String packageN){
        if (packageN != null || !"".equals(packageN.trim())){
            packageName = packageN;
        }
        initPojo(connection);
    }

    public static void initPojo(SqlSession sqlSession, String packageN){
        if (packageN != null || !"".equals(packageN.trim())){
            packageName = packageN;
        }
        initPojo(sqlSession);
    }

    public static void initPojo(Connection connection) {
        try(PreparedStatement statement = connection.prepareStatement(showTables);
            ResultSet rs = statement.executeQuery()) {
            while (rs.next()){
                String tableName = rs.getString(1);
                initPOJOFields(connection ,tableName);
            }
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("pojo 初始化失败！");
        }
    }

    public static void initPojo(SqlSession sqlSession) {
        try {
            Connection connection = sqlSession.getConfiguration().getEnvironment().getDataSource().getConnection();
            initPojo(connection);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            sqlSession.close();
        }
    }

    public static void deletePojo(){
        File file = new File("src/main/java/" + getPath());
        if (file.exists()) {
            File[] files = file.listFiles();
            for (File file1 : files) {
                file1.delete();
            }
            file.delete();
        }
    }

    public static void rebuildPojo(Connection connection){
        deletePojo();
        initPojo(connection);
    }
    public static void rebuildPojo(SqlSession sqlSession){
        deletePojo();
        initPojo(sqlSession);
    }

    private static void initPOJOFields(Connection connection,String tableName) {
        if (fieldNames == null){
            fieldNames = new ArrayList<>();
        }else {
            fieldNames.clear();
        }
        if (fieldTypes == null){
            fieldTypes = new ArrayList<>();
        }else {
            fieldTypes.clear();
        }
        try(PreparedStatement statement = connection.prepareStatement(desTable + tableName);
            ResultSet rs = statement.executeQuery()) {
            while (rs.next()){
                fieldNames.add(headToLower(rs.getString(1)));
                String fileType = rs.getString(2);
                if (fileType.startsWith("char") || fileType.startsWith("varchar")){
                    fieldTypes.add("String");
                }else if (fileType.startsWith("int")){
                    fieldTypes.add("int");
                }else if (fileType.startsWith("double")){
                    fieldTypes.add("double");
                }else if (fileType.startsWith("longblob")){
                    fieldTypes.add("byte[]");
                }else if (fileType.startsWith("timestamp")){
                    fieldTypes.add("java.util.Date");
                }
            }
            createPojo(tableName);

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private static void createPojo(String tableName) {
        File file = new File("src/main/java/" + getPath());
        if (!file.exists()){
            file.mkdir();
        }
        String className = headToUpper(tableName);
        String path = file.getAbsolutePath() + "/" + className + ".java";
        try(BufferedWriter fos = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path)))){
            String classFile = getClassFile(className);
            fos.write(classFile);
            fos.flush();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    /**
     * 建造类的核心方法
     * @param className
     * @return
     */
    private static String getClassFile(String className) {
        if (sb == null) {
            sb = new StringBuilder();
        }else {
            sb.delete(0, sb.length());
        }
        sb.append("package ").append(packageName).append(";").append(nextLine);
        sb.append("public class ").append(className).append(empty).append("implements java.io.Serializable")
                .append("{").append(nextLine);
        appendFields();
        appendEmptyConstructor(className);
        appendGetterAndSetter();
        appendToString(className);
        sb.append("}");
        return sb.toString();
    }
    /**
     * 生成属性
     */
    private static void appendFields(){
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(table).append("private ").append(fieldTypes.get(i)).append(empty)
                    .append(fieldNames.get(i)).append(";").append(nextLine);
        }
    }
    /**
     * 生成空参构造方法
     * @param className
     */
    private static void appendEmptyConstructor(String className){
        sb.append(table).append("public ").append(className).append("(){}").append(nextLine);
    }

    /**
     * 生成get和set方法
     */
    private static void appendGetterAndSetter(){
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(table).append("public ").append(fieldTypes.get(i)).append(empty)
                    .append("get").append(headToUpper(fieldNames.get(i))).append("(){").append(nextLine)
                    .append(table).append(table).append("return this.").append(fieldNames.get(i))
                    .append(";").append(nextLine).append(table).append("}").append(nextLine);
            sb.append(table).append("public void ").append("set").append(headToUpper(fieldNames.get(i)))
                    .append("(").append(fieldTypes.get(i)).append(empty).append("value")
                    .append("){").append(nextLine).append(table).append(table).append("this.")
                    .append(fieldNames.get(i)).append(empty).append("=").append(empty)
                    .append("value;").append(nextLine).append(table).append("}").append(nextLine);
        }
    }

    /**
     * 生成toString
     * @param className
     */
    private static void appendToString(String className){
        sb.append(table).append("@Override").append(nextLine);
        sb.append(table).append("public String toString() {").append(nextLine);
        sb.append(table).append(table).append("return ").append("\"")
                .append(className).append("{");
        for (int i = 0; i < fieldNames.size(); i++) {
            sb.append(i > 0 ? "\", " : "").append(fieldNames.get(i)).append("='\"+");
            sb.append(fieldNames.get(i)).append("+\"'")
                    .append("\"+")
                    .append(nextLine).append(table).append(table);
        }
        sb.append("\"}").append("\";").append(nextLine);

        sb.append(table).append("}").append(nextLine);
    }

    private static String headToUpper(String t){
        return t.substring(0, 1).toUpperCase() + t.substring(1);
    }
    private static String headToLower(String t){
        return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
}