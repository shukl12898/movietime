package edu.usc.csci310.project;
import org.apache.commons.codec.digest.DigestUtils;

public class Encryption {

    /**
     * Uses Apache Commons Codec to generate a hex value using
     * SHA-256 hashing operations.
     * @param data for the string to be encrypted
     * @return hex value in a String
     */
    public static String hash(String data) {
        String hash = DigestUtils.sha256Hex(data);
        return hash;
    }

}
