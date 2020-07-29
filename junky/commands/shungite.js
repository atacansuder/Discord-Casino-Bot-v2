const shungite = {
    'english': "Anyways, um... I bought a whole bunch of shungite rocks, do you know what shungite is? Anybody know what shungite is? No, not Suge Knight, I think he's locked up in prison. I'm talkin' shungite. Anyways, it's a two billion year-old like, rock stone that protects against frequencies and unwanted frequencies that may be traveling in the air. That's my story, I bought a whole bunch of stuff. Put 'em around the la casa. Little pyramids, stuff like that.",
    'turkish': "Neyse, ee... Bir sürü shungit aldım, shungitin ne olduğunu biliyor musunuz? Shungitin ne olduğunu bilen var mı? Hayır, Suge Knight değil. Yanlış hatırlamıyorsam o hapiste. Shungitten bahsediyorum. Neyse, iki milyar yıllık, frekanslardan ve havada dolanan istenmeyen frekanslardan koruyan bi taş. Hikayem bu, bir sürü aldım, bütün la casaya dizdim. Küçük piramitler falan işte.",
    'german': "Jedenfalls, ähm... Ich habe einen ganzen Haufen Shungitgestein gekauft, wissen Sie, was Shungit ist? Weiß irgendjemand, was Shungit ist? Nein, nicht Suge Knight. Ich glaube, er ist im Gefängnis eingesperrt. Ich spreche von Shungit. Wie auch immer, es ist ein zwei Milliarden Jahre alter Felsbrocken, der vor Frequenzen und unerwünschten Frequenzen schützt, die sich in der Luft bewegen könnten. Das ist meine Geschichte, ich habe einen ganzen Haufen Zeug gekauft. Legte sie rund um die la casa. Kleine Pyramiden und so weiter.",
    'chinese': "无论如何，啊。。。我买了一整堆的shungite岩石，你知道什么是shungite吗？有人知道什么是shungite吗？不，不是Suge Knight，我认为他已被关进监狱。我在说shungite。无论如何，它就像一块二十亿年前的岩石，可以防止在空中传播的频率和有害频率。那是我的故事，我买了一堆东西。将它们放在la Casa周围。小金字塔，像那样的东西。",
    'dutch': "Hoe dan ook, um... Ik heb een heleboel shungite stenen gekocht, weet je wat shungite is? Weet iemand wat shungite is? Nee, niet Suge Knight, ik denk dat hij opgesloten zit in de gevangenis. Ik heb het over stront. Hoe dan ook, het is een twee miljard jaar oude rotssteen die beschermt tegen frequenties en ongewenste frequenties die in de lucht kunnen rondzwerven. Dat is mijn verhaal, ik heb een heleboel spullen gekocht. Zet ze rond de la casa. Kleine piramides, dat soort dingen.",
    'japanese': "とにかく... shungiteの石をたくさん買ってきたんだ、 shungiteって知ってる？ いや、Suge Knightじゃなくて、 刑務所に入ってるだろう。 Shungiteのことだよ。 とにかく、20億年前の石で... 周波数から守る効果がある... 空気中の悪い周波数からね。 それを大量に買ったんだ。 la casaの周りに置いた、 なんか小さなピラミッドのようなものとか。",
    'hebrew': "בכל מקרה, אממ ... קניתי חבורה שלמה של סלעים shungite, אתה יודע מה זה shungite? מישהו יודע מה זה shungite? לא, לא סורג נייט, אני חושב שהוא נכלא בכלא. אני מדבר shungite. בכל אופן, מדובר באבן סלע בת שני מיליארד שנה שמגנה מפני תדרים ותדרים לא רצויים שעלולים לנסוע באוויר. זה הסיפור שלי, קניתי חבורה שלמה של דברים. שים אותם סביב לה la casa. פירמידות קטנות, דברים כאלה.",
    'polish': "W każdym razie, um ... Kupiłem całą masę skał szungitowych, wiesz co to jest? Czy ktoś wie, czym sa skały szungitowe? Nie, nie Suge Knight, a on nie jest zamknięty w więzieniu? Mówię o skalach szungitowych. W każdym razie szungit to dwumiliardowy kamień, który chroni przed częstotliwościami,które mogą podróżować w powietrzu. To tyle, kupiłem całą masę rzeczy. Położyłem je dokola la casa. Małe piramidy, takie tam.",
	'indian': "वैसे भी, उम ... मैंने शुंगाइट चट्टानों का एक पूरा गुच्छा खरीदा है, क्या आप जानते हैं कि शुंगाइट क्या है? किसी को पता है कि शुंगाइट क्या है? नहीं, सगे नाइट नहीं, मुझे लगता है कि वह जेल में बंद है। मैं बात कर रहा हूँ ' शुंगाइट 'वैसे भी, यह दो अरब साल पुराना है, जैसे कि पत्थर का पत्थर जो आवृत्तियों और अवांछित आवृत्तियों से बचाता है जो हवा में यात्रा कर सकता है। यह मेरी कहानी है, मैंने सामान का एक पूरा गुच्छा खरीदा। ला कासा के चारों ओर उन्हें रखो। छोटे पिरामिड, सामन क तरह।",
	'hungarian': "Szóval, hmm... vettem egy csomó sungitkövet, tudod te mi az a sungit? Tudja bárki, hogy mi az a sungit? Nem, nem Suge Knight, azt hiszem ő éppen börtönben van. Én a sungitról beszélek. Amúgy, ez egy kettő milliárd éves szikladarab, ami az olyan frekvenciák és nem kívánatos frekvenciák ellen véd, amik a levegőben utazhatnak. Ez az én történetem, egy halom cuccot vásároltam. Körbe rakom vele a la casa. Kis piramisokkal, meg hasonló."
}


exports.run = (client, message, args, h) => {
    
   if(!args[0]){
       message.channel.send(shungite['english']);
       return;
   }

   if(args[0] in shungite){
        message.channel.send(shungite[args[0]]);
        return;
   }
   else{
       var languages = "";
       for (let [key, value] of Object.entries(shungite)) {
           languages += key + " ";
       }
       message.reply(" the language is not found. Supported languages are " + languages);
       return;
   }

}

