Rollidele Enumid lisada?

create table User (
	ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Email varchar(80) NOT NULL,
    Username varchar(50) not null UNIQUE,
    Password varchar(80) not null
);

create table Role (
	ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    RoleName varchar(50) not null UNIQUE
);

create table UserRoles (
	primary key(UserID, RoleID),
    UserID BIGINT not null,
    Username varchar(50) not null,
    RoleID BIGINT not null,
    RoleName varchar(50) not null default 'user',
	CONSTRAINT `fk_User_Role_UserID` foreign key (UserID) references User (ID) ON DELETE CASCADE,
    CONSTRAINT `fk_User_Role_RoleID` foreign key (RoleID) references Role (ID) ON DELETE CASCADE
)ENGINE = InnoDB;

create table Movie (
	ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title varchar(100) not null,
    ReleaseYear int,
    LocationURI varchar(200) UNIQUE,
    Price int not null
);

create table TvSerie (
	ID BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title varchar(100) not null,
    ReleaseYear int,
    Episodes int,
    Seasons int,
    LocationURI varchar(200) UNIQUE,
    Price int not null
);


insert into User (Username, Password, Email) values ('anehls0', 'VSjkzibw', 'lrawsen0@goo.gl');
insert into User (Username, Password, Email) values ('samery1', 'FWHqEjal', 'rgearty1@house.gov');
insert into User (Username, Password, Email) values ('pware2', 'JRFU24', 'gkenewell2@geocities.jp');
insert into User (Username, Password, Email) values ('cslocom3', 'gXbhLlN1B4cM', 'mwhalebelly3@i2i.jp');
insert into User (Username, Password, Email) values ('laxelby4', 'yXXTsNBUr', 'meste4@parallels.com');
insert into User (Username, Password, Email) values ('abraunlein5', 'r7aSyvIucr', 'bavramov5@house.gov');
insert into User (Username, Password, Email) values ('dangrock6', 'l2rUfSZeO2', 'zfairbank6@springer.com');
insert into User (Username, Password, Email) values ('mmowles7', 'yFaFlsTuD5U', 'pcolton7@blogger.com');
insert into User (Username, Password, Email) values ('dhulles8', '8JKUzy1P', 'ebeaves8@shutterfly.com');
insert into User (Username, Password, Email) values ('kgamage9', 'njFUVyl', 'tbraznell9@google.com');
insert into User (Username, Password, Email) values ('ngeorgiadesa', '53aCjlHauw', 'ayankova@youku.com');
insert into User (Username, Password, Email) values ('askirvinb', 'TFr8Hkiv2G6f', 'mlaiteb@angelfire.com');
insert into User (Username, Password, Email) values ('nechlinc', 'VX5RCUQ', 'bmcatamneyc@stanford.edu');
insert into User (Username, Password, Email) values ('lpockeyd', 'ABVYXJ18', 'tpropd@vimeo.com');
insert into User (Username, Password, Email) values ('dmatushenkoe', 'iSe3AWlceabO', 'bscardifeilde@nyu.edu');
insert into User (Username, Password, Email) values ('jcolacof', 'AWITrDmt', 'abattrumf@dion.ne.jp');
insert into User (Username, Password, Email) values ('sdilkeg', 'w6QM32eI', 'sdraperg@omniture.com');
insert into User (Username, Password, Email) values ('molochanh', 'gc281646rQ7r', 'ndrooganh@smh.com.au');
insert into User (Username, Password, Email) values ('jmcgurki', 'XcbOFm', 'cshuttelli@census.gov');
insert into User (Username, Password, Email) values ('btiltj', 'N6JXhL', 'ctanzigj@i2i.jp');
insert into User (Username, Password, Email) values ('sfessierk', 'BEbaLavhX', 'tlonsdalek@nhs.uk');
insert into User (Username, Password, Email) values ('eshortl', '6m8T1kaqre8h', 'rholseyl@skyrock.com');
insert into User (Username, Password, Email) values ('sgrigorem', 'iQjdb2qAtq', 'wdakersm@nydailynews.com');
insert into User (Username, Password, Email) values ('amckimmeyn', 'F2FzNQyU3JU', 'cbramstomn@senate.gov');
insert into User (Username, Password, Email) values ('hmckellocho', 'BTDlA0Ueoi4', 'mwhitlawo@mozilla.com');
insert into User (Username, Password, Email) values ('rschottlip', 'LxgCWv', 'ukerswillp@time.com');
insert into User (Username, Password, Email) values ('jsappsonq', 'CZJItiap', 'mmcdillq@hugedomains.com');
insert into User (Username, Password, Email) values ('jeveringtonr', 'vKtOHQ1nO7', 'wlawransonr@w3.org');
insert into User (Username, Password, Email) values ('yvannets', 'i7UsEQpGhSaK', 'isleggs@desdev.cn');
insert into User (Username, Password, Email) values ('whuet', 'zBRtAEDec9qA', 'nlodovichit@tinypic.com');
insert into User (Username, Password, Email) values ('acribbottu', '14359kvQchaL', 'ajacquesu@microsoft.com');
insert into User (Username, Password, Email) values ('ddonovinv', 'hWUFqZpV7', 'ocuerdallv@theglobeandmail.com');
insert into User (Username, Password, Email) values ('meaklew', '8fOJLFrtGVB', 'gcreusw@who.int');
insert into User (Username, Password, Email) values ('amottersheadx', 'TrpVZH9j2P9', 'ckennifickx@walmart.com');
insert into User (Username, Password, Email) values ('dsnowsilly', 'FcPshpTo', 'wmartinecy@indiatimes.com');
insert into User (Username, Password, Email) values ('gpiwallz', '0FxJBYcwM2', 'hknillz@dmoz.org');
insert into User (Username, Password, Email) values ('lhugonnet10', '1cd0jDZ', 'asanderson10@eventbrite.com');
insert into User (Username, Password, Email) values ('gotimony11', 'sMDz60', 'asheard11@squarespace.com');
insert into User (Username, Password, Email) values ('jseeley12', 'wTzKarM0E', 'ahinstock12@tripod.com');
insert into User (Username, Password, Email) values ('clambourne13', '69cIzK940t', 'rgarrard13@dell.com');
insert into User (Username, Password, Email) values ('dbagenal14', '5FC1g5tZt8', 'tcorbie14@tinyurl.com');
insert into User (Username, Password, Email) values ('atwigger15', 'MrHaLZn', 'mshuttlewood15@nifty.com');
insert into User (Username, Password, Email) values ('jdudeney16', '4ETwymJH80', 'rsimeone16@devhub.com');
insert into User (Username, Password, Email) values ('ijiles17', 'ysKqMhNNPH5', 'ggilstoun17@nih.gov');
insert into User (Username, Password, Email) values ('osommerville18', 'cmkPVUI', 'hbogies18@nih.gov');
insert into User (Username, Password, Email) values ('ekarleman19', 'psT5J8nrw8U', 'dseabon19@sun.com');
insert into User (Username, Password, Email) values ('lsawley1a', 'Am2afrGf346', 'bbernucci1a@i2i.jp');
insert into User (Username, Password, Email) values ('rdanit1b', 'RJwxQPM1f9', 'tpetrecz1b@sfgate.com');
insert into User (Username, Password, Email) values ('vscarlet1c', 'D9mNBd11F', 'tlardge1c@timesonline.co.uk');
insert into User (Username, Password, Email) values ('hhannam1d', '908bWs5', 'adavall1d@squarespace.com');

insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Kolmistaan', 1997, 'http://ft.com/curabitur.aspx', 38.58);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Run, Man, Run! (Corri uomo corri)', 1998, 'https://slashdot.org/vel/augue/vestibulum/ante/ipsum/primis/in.html', 86.31);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('BloodRayne: The Third Reich', 2000, 'https://accuweather.com/nulla/eget/eros.png', 77.95);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Vertical Limit', 1992, 'https://joomla.org/diam/cras/pellentesque/volutpat/dui/maecenas/tristique.html', 56.04);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('American Graffiti', 1994, 'https://livejournal.com/nulla/tellus.html', 62.06);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Midway', 2007, 'http://exblog.jp/ac.jsp', 39.17);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Oxy-Morons', 2004, 'https://webeden.co.uk/diam/neque/vestibulum.jpg', 53.41);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('To.get.her', 2011, 'https://forbes.com/consectetuer/eget/rutrum/at/lorem.png', 50.28);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Summer Heights High', 2011, 'https://goodreads.com/cras/pellentesque/volutpat/dui/maecenas/tristique/est.js', 15.85);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Mitä meistä tuli', 2009, 'https://go.com/diam/neque/vestibulum.aspx', 44.72);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Wyoming Renegades', 2009, 'http://usgs.gov/mi/integer/ac.aspx', 19.73);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Siberian Education (Educazione siberiana)', 2012, 'http://slate.com/malesuada/in/imperdiet/et/commodo.aspx', 12.99);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Hound of the Baskervilles, The', 2001, 'http://woothemes.com/vel/sem.html', 32.41);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Closet, The (Placard, Le)', 1997, 'http://disqus.com/tellus/nisi/eu/orci/mauris/lacinia/sapien.xml', 25.06);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Cannonball', 2002, 'http://is.gd/volutpat/dui.jsp', 3.92);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Love of Siam, The (Rak haeng Siam)', 1995, 'https://uiuc.edu/ut.jsp', 29.79);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Double, Double, Toil and Trouble', 2010, 'https://chicagotribune.com/posuere/nonummy/integer/non.jpg', 26.42);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('April Showers', 1993, 'http://reference.com/turpis/donec/posuere.js', 23.82);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Son of Babylon (Syn Babilonu)', 2004, 'http://zimbio.com/magnis.js', 62.84);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Doctor at Sea', 2008, 'https://mashable.com/at/nulla/suspendisse/potenti/cras.jsp', 75.37);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Susan Slept Here', 2001, 'http://digg.com/platea.html', 78.96);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('V for Vendetta', 2004, 'http://desdev.cn/ante/ipsum/primis/in/faucibus/orci/luctus.aspx', 15.88);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Deeper Shade of Blue, A', 2007, 'https://youtu.be/lorem/ipsum/dolor/sit.jpg', 91.68);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Tokyo Story (Tôkyô monogatari)', 2006, 'http://fc2.com/condimentum/curabitur/in/libero.xml', 24.05);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Adventure in Space and Time, An', 2001, 'https://de.vu/in/est/risus/auctor.png', 14.31);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Song of the Bloodred Flower (Laulu tulipunaisesta kukasta)', 2001, 'http://free.fr/mauris/vulputate/elementum/nullam/varius.jpg', 88.87);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('The Raid: Redemption', 2004, 'http://google.com.hk/dolor/sit/amet/consectetuer/adipiscing.png', 83.9);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('DOA: Dead or Alive', 2012, 'http://theguardian.com/rhoncus.png', 33.43);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Islander', 1994, 'https://shop-pro.jp/mauris.aspx', 96.57);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Top Floor Left Wing (Dernier étage gauche gauche)', 1991, 'http://smugmug.com/arcu/libero/rutrum/ac.jpg', 98.43);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Princess of Montpensier, The (La princesse de Montpensier)', 1994, 'https://gravatar.com/justo/sollicitudin/ut/suscipit/a/feugiat/et.js', 14.58);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Volga - Volga', 1996, 'http://rambler.ru/turpis/elementum/ligula.html', 13.14);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Looking for Cheyenne (Oublier Cheyenne)', 2003, 'https://wix.com/aliquam/erat/volutpat/in.json', 34.47);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Psychomania (Death Wheelers, The)', 1993, 'https://360.cn/praesent.aspx', 75.7);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Home Page', 1987, 'https://jiathis.com/habitasse/platea/dictumst/aliquam/augue/quam/sollicitudin.xml', 72.38);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Magnificent Bodyguards (Fei du juan yun shan)', 1998, 'https://51.la/vehicula/condimentum.json', 52.04);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Cutting Edge: The Magic of Movie Editing, The', 1990, 'https://deliciousdays.com/lacus/morbi/quis.png', 43.94);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Sword of Doom, The (Dai-bosatsu tôge)', 1998, 'http://wp.com/tincidunt/nulla/mollis/molestie/lorem.aspx', 64.13);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Bride Came C.O.D., The', 1967, 'http://godaddy.com/tristique/tortor/eu.png', 71.67);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Devil''s Chair, The', 1992, 'https://marketwatch.com/ipsum/dolor/sit/amet.json', 6.66);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Charlie Wilson''s War', 2008, 'https://deliciousdays.com/blandit/non/interdum/in/ante.js', 38.88);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Malibu''s Most Wanted', 1992, 'http://soup.io/semper/est.png', 98.62);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Mirage Men', 1991, 'https://washington.edu/vel/ipsum.json', 50.31);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Honeymoon in Vegas', 1993, 'http://nytimes.com/vestibulum/eget/vulputate/ut/ultrices.html', 85.49);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Simon Magus', 2011, 'https://ucoz.ru/platea/dictumst/etiam/faucibus/cursus/urna/ut.png', 27.51);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('The Longest Week', 1992, 'http://woothemes.com/sem/mauris/laoreet.jpg', 30.24);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Five Obstructions, The (Fem benspænd, De)', 2003, 'http://microsoft.com/tempus.json', 14.33);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Return of Jafar, The', 2000, 'https://samsung.com/mauris.aspx', 97.8);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Gideon''s Army', 2004, 'http://shinystat.com/ac/nibh/fusce/lacus/purus/aliquet/at.aspx', 52.48);
insert into Movie (Title, ReleaseYear, LocationURI, Price) values ('Remonstrance', 1994, 'http://harvard.edu/nunc/purus/phasellus.aspx', 52.9);

insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Terror, The', 2004, 836, 30, 'https://opensource.org/ipsum/dolor/sit/amet/consectetuer/adipiscing.html', 16.47);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('No Flesh Shall Be Spared', 2002, 950, 6, 'http://howstuffworks.com/neque/sapien/placerat/ante.jsp', 46.97);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Fear and Loathing in Las Vegas', 2011, 84, 1, 'https://mlb.com/eu/mi/nulla.aspx', 42.32);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Meatballs', 1987, 624, 41, 'http://instagram.com/non/ligula/pellentesque/ultrices/phasellus/id/sapien.jsp', 33.48);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Fighter, The', 1992, 383, 19, 'https://typepad.com/lectus/vestibulum/quam/sapien.jsp', 46.67);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Amore (L''Amore)', 2006, 147, 7, 'http://sourceforge.net/sollicitudin/vitae/consectetuer.png', 33.09);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Man with an Apartment (Czlowiek z M-3)', 1988, 797, 30, 'http://typepad.com/in.js', 14.97);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Pyrates', 1994, 275, 36, 'http://github.io/nisl/nunc.jsp', 4.97);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Hood of Horror', 1998, 76, 15, 'https://fema.gov/porttitor/pede/justo/eu/massa.jpg', 37.44);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Kummelin jackpot', 1999, 41, 38, 'http://cdc.gov/mauris/vulputate/elementum/nullam.xml', 32.5);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Love is God', 2011, 675, 39, 'http://yahoo.co.jp/habitasse/platea/dictumst/morbi/vestibulum/velit.json', 13.45);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Myra Breckinridge', 1993, 9, 39, 'https://comcast.net/in/ante/vestibulum/ante/ipsum/primis.js', 17.46);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Rancho Deluxe', 2003, 408, 20, 'https://deviantart.com/ligula/nec.js', 21.84);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('How the Myth Was Made: A Study of Robert Flaherty''s Man of Aran', 1999, 638, 25, 'https://squarespace.com/nam/tristique/tortor/eu.html', 27.77);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Shogun''s Ninja (Ninja bugeicho momochi sandayu)', 2010, 506, 16, 'https://usatoday.com/sit/amet/consectetuer/adipiscing.jpg', 40.09);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Frontière(s)', 2010, 636, 40, 'https://squarespace.com/dolor/morbi/vel/lectus.jpg', 20.35);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('After the Rehearsal (Efter repetitionen)', 2007, 101, 3, 'http://usatoday.com/nam/dui/proin/leo/odio/porttitor/id.js', 14.99);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Arrowhead', 1991, 249, 13, 'https://goodreads.com/curae/mauris/viverra.aspx', 7.52);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Over the Hedge', 1974, 248, 45, 'https://skype.com/consequat/nulla.aspx', 10.0);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Peeping Tom', 2005, 761, 9, 'http://ezinearticles.com/purus/phasellus.js', 23.62);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Dragon Day', 1996, 28, 11, 'https://columbia.edu/mauris/sit/amet.jsp', 44.73);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('1984 (Nineteen Eighty-Four)', 2009, 653, 36, 'http://washingtonpost.com/egestas.js', 33.37);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('On a Clear Day', 2011, 515, 28, 'https://fc2.com/magna/ac/consequat/metus/sapien.jpg', 11.43);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Rosemary''s Baby', 2000, 838, 34, 'https://cafepress.com/pellentesque/at.jpg', 38.26);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Your Highness', 2007, 609, 24, 'https://digg.com/et.html', 37.43);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('T.N.T.', 1995, 759, 30, 'http://imageshack.us/at/ipsum/ac/tellus/semper/interdum/mauris.html', 48.27);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('For Love of the Game', 1993, 788, 50, 'https://forbes.com/rhoncus/sed/vestibulum/sit/amet.html', 16.37);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Victim', 2007, 983, 38, 'http://qq.com/vulputate/nonummy/maecenas/tincidunt.aspx', 8.44);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Stunt Man, The', 1993, 614, 21, 'http://geocities.jp/leo/odio/condimentum/id.html', 11.14);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Raisin in the Sun, A', 2004, 26, 31, 'http://engadget.com/amet/eleifend/pede/libero/quis.jpg', 40.36);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Why Me?', 1992, 408, 42, 'https://mayoclinic.com/in/faucibus/orci/luctus/et/ultrices.js', 22.13);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Frozen Hell (Jäämarssi) ', 2009, 443, 28, 'https://goo.gl/vitae/nisl/aenean/lectus/pellentesque/eget/nunc.jpg', 35.87);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Little Darlings', 1994, 609, 19, 'https://microsoft.com/risus/auctor/sed/tristique.jsp', 35.33);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Caroline?', 1999, 292, 2, 'http://clickbank.net/massa/donec/dapibus.aspx', 30.88);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Glass House, The', 2011, 381, 40, 'http://facebook.com/ut.png', 49.71);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Silent Night, Deadly Night 5: The Toy Maker', 2004, 891, 4, 'http://wsj.com/amet/eleifend/pede/libero/quis/orci/nullam.aspx', 1.87);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Oceans (Océans)', 2010, 695, 47, 'http://seattletimes.com/ullamcorper/purus/sit/amet/nulla.jpg', 32.11);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Out of Balance: ExxonMobil''s Impact on Climate Change', 2005, 478, 44, 'http://furl.net/libero/nullam/sit/amet/turpis/elementum.json', 12.68);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Dancing Hawk, The (Tanczacy jastrzab)', 1999, 206, 21, 'https://sina.com.cn/sit/amet/diam/in/magna/bibendum.jpg', 41.51);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Mademoiselle Chambon', 2012, 823, 25, 'https://mapy.cz/quam/pharetra/magna.jsp', 18.72);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Goalie''s Anxiety at the Penalty Kick, The (Die Angst des Tormanns beim Elfmeter)', 1999, 816, 24, 'http://opera.com/consequat/ut/nulla/sed.png', 46.6);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Barbershop 2: Back in Business', 2011, 986, 44, 'http://phpbb.com/pellentesque/at/nulla/suspendisse/potenti/cras/in.xml', 6.14);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Only the Strong Survive - A Celebration of Soul', 2011, 120, 8, 'http://tmall.com/ac.html', 3.89);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Kaena: The Prophecy (Kaena: La prophétie)', 1986, 253, 35, 'http://ebay.com/hac/habitasse/platea.json', 18.35);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Fuse (Gori vatra)', 1993, 53, 16, 'http://hhs.gov/odio/odio.html', 33.06);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Lady in a Cage', 1993, 382, 50, 'https://dagondesign.com/nunc/vestibulum/ante/ipsum/primis/in/faucibus.js', 29.2);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Allegheny Uprising', 2005, 331, 18, 'http://elegantthemes.com/consequat/lectus.jpg', 17.93);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Raising Helen', 2001, 624, 47, 'http://ovh.net/odio.json', 33.77);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Made in Dagenham', 2003, 319, 33, 'http://hexun.com/ligula/in/lacus.jpg', 36.39);
insert into TvSerie (Title, ReleaseYear, Episodes, Seasons, LocationURI, Price) values ('Welcome to the Sticks (Bienvenue chez les Ch''tis)', 2002, 687, 29, 'http://reuters.com/eget/vulputate/ut/ultrices/vel/augue.aspx', 1.11);
