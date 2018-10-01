var i18n = require("i18n-js");

i18n.defaultLocale = "ba";
i18n.locale = "ba";
i18n.missingBehaviour='guess';
i18n.missingTranslationPrefix='';

i18n.translations = {
    en: {
        drawer: {
            wallet: 'Your wallet'
        },
    },
    ba: {
        "Log In": "Log In",
        "Create a free website for your wedding": "Buat website gratis untuk pernikahanmu",
        "With easy to use templates and features to make your wedding planning that much easier": "Tersedia template dan fitur yang mudah dipakai untuk membantu perencanaan nikahmu jauh lebih mudah",
        "Register For Free": "Daftar Gratis di Sini",
        "Templates": "Template",
        "100+ Easy to Use templates to match your specific needs": "Lebih dari 100 Template yang Mudah Dipakai Sesuai Kebutuhanmu",
        "Choose your template": "Pilih template-mu",
        "Its as easy as 1,2,3!": "Semudah 1, 2, 3!",
        "We have over 100+ designs to choose from.": "Kami memiliki lebih dari 100 desain yang bisa dipilih.",
        "Put your personal touches": "Berikan sentuhan pribadimu.",
        "Add wedding details, photos, stories. Let guests RSVP too!": "Tambahan detail pernikahan, foto, dan kisah. Tamu pun bisa melakukan RSVP..",
        "Share it with guests": "Bagikan dengan para undangan",
        "Share the link online or print it on your wedding invitations.": "Bagikan tautan secara online atau cetak ke kartu undanganmu.",
        "Customize and change your wedding anytime!": "Buat desain khusus dan ubah gaya pernikahanmu kapan pun!.",
        "Change your template whenever you want - we are adding templates all the time. Password protect your site or make it unsearchable on google": "Ganti template kapan pun, kami terus menambahkan template. Lindungi website-mu dengan kata sandi atau buatlah agar tidak dapat dicari di google.",
        "Try for free": "Cobalah secara gratis",
        "Seamlessly connect your hashtag to your website": "Koneksikan tagar ke website-mu dengan mulus",
        "Add your #hashtag instagram stream to get guests excited, or for you to reminisce after your wedding!": "Tambahkan #hashtag Instagram untuk membuat para tamu bersemangat, atau untuk kamu kenang setelah acara usai!",
        "Get Started": "Memulai",
        "Get guests info online": "Berikan informasi ke para undangan secara online",
        "No more waiting for paper RSVPs or contacting your guests individually": "Tidak perlu lagi menunggu RSVP tertulis atau menghubungi tamu satu per satu",
        "Have guests directly RSVP on your wedding website": "Sediakan para tamu tempat untuk melakukan RSVP di website nikahmu",
        "Ask for food preferences, song requests, are they bringing a date?": "Tanyakan preferensi makanan mereka, permintaan lagu, apakah mereka datang dengan pasangan?",
        "Track every response on our Guest List Manager": "Lacak setiap respons melalui Manajer Daftar Tamu",
        "Will Attend, Will Not Attend": "Akan Datang, Tidak Bisa Datang",
        "Food preference": "Preferensi makanan",
        "Song requests?": "Permintaan lagu?",
        "I would like to receive paper invitations, please send it to:": "Saya ingin menerima undangan tertulis, mohon kirimkan ke:",
        "After clicking log in button >": "Setelah mengklik tombol log in >",
         "Sign Up": "Mendaftar",
         "Sign up for free": "Daftar Gratis di Sini",

    }
};

export function t(key){
    return i18n.t(key);
}
export default i18n;
