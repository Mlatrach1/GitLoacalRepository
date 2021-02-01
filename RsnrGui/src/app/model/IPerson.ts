//import { Medborjarskap } from './Medborjarskap';
//import { Adress } from './Adress';

export class IPerson {
    /*Dokumentuppgifter*/
    //id: string;
    Namn_kontaktperson: string;
    phone: string;
    E_post_kontaktperson: string;
    //Handling: string;

    // Ärendeuppgifter/Person
    //dateOf: Date;
    Födelseår: number;
    Födelsemånad: number;
    Födelsedag: number;

    kön: string;
    Efternamn: string;
    Förnamn: string;
    Ytterligare_namnuppgift: string;
    Födelseort_i_utlandet: string;
    // medborjaskap: Medborjarskap[];
    medbor: string[];

    // Ärendeuppgifter/Kontaktadress
    //adress: Adress
    CO_adress: string;
    Adressfortsättning: string;
    Gatudress: string;
    Lagenhetsnummer: string;
    Postnummer: string;
    Postort: string;

    //Ärendeuppgifter/Övrigt
    FaststalltId: string;
    UnderlagId: string;
    Övriga_upplysningar: string

}