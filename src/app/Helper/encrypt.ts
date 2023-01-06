import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UrlEncrypt {
  public keys: string = '1234567890';


  constructor( ) { }
  encrypt(value : any)
  {
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  decrypt(value: any)
  {
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var decrypted = CryptoJS.AES.decrypt(value.toString(),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    let dd = decrypted.toString(CryptoJS.enc.Utf8);
    // alert(dd);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}







