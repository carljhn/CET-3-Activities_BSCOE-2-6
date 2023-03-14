let btn = document.getElementById('btn');
let output = document.getElementById('output');
var sound = document.getElementById("bgm");
sound.volume = 0.3;
let trivias = 
    [
        "Rio de Janeiro’s name means River of January in Portuguese.",
        "There are always ravens in the Tower of London.",
        "Delhi and New Delhi are the same city.",
        "Eau de Cologne comes from Cologne, Germany.",
        "Baghdad was the capital of the Muslim world for 500 years.",
        "Damascus is a UNESCO World Heritage Site.",
        "Helsinki’s sidewalks get heated from underground.",
        "Chengdu is the source of China’s tea culture.",
        "There’s a spider named after Sydney, Australia.",
        "Kuala Lumpur means river junction in Malay.",
        "Cats have legal protection in Rome.",
        "You can find the world’s oldest restaurant in Madrid.",
        "The smallest bookstore in the world is in Lisbon.",
        "Quebec is the oldest Frenchpeaking community in North America.",
        "Miami stands on reclaimed land.",
        "Nairobi was once a camp for railroad workers.",
        "There are more than 50,000 cities in the world.",
        "Megacities are cities with more than 10 million people living in them.",
        "Tokyo is the most populated city in the world, with more than 38 million people.",
        "New York is the biggest city in the world, with 8,683 km² in area.",
        "The Vatican City is the smallest city in the world, with only 44 hectares in area.",
        "Mexico City was once the capital of the Aztec Empire.",
        "The first skyscraper in the world was in Chicago.",
        "Moscow’s Kremlin is the only medieval fortress still in use today.",
        "Alexandria in Egypt shares its name with Alexander the Great.",
        "Kyoto was Japan’s capital for over a thousand years.",
        "Seoul’s population density is greater than New York’s.",
        "Pyongyang has the world’s tallest unoccupied building.",
        "A cannon gets fired in Cape Town every day.",
        "There are gold ATMs in Abu Dhabi.",
        "There are at least 5000 homeless children in Mogadishu",
        "Cebu is the oldest city in the Philippines",
        "There’s only one Stop sign in the whole city in Paris, because usually they adopt the method of giving way to the person on the right.",
        "There are total 6100 streets in the city of Paris",
        "It took around 666 years to build the great Louvre",
        "Around 3000 people have committed suicide jumping off the Golden Gate Bridge.",
        "San Francisco remained a part of Mexico City till the American Mexican war in 1948.",
        "Cairo is home to Africa’s only subway.",
        "If you’re traveling with a child in a stroller, buses in Stockholm are free of charge.",
        "Foreigners make up most of Dubai’s population! The local people, called Emiratis, are just 15% of the total!",
        "Mumbai’s trains carry around six million people per day — that’s more than the entire population of Finland.",
        "You might expect Rio, with its famously stunning and crowded beaches, to be an incredibly hot place. However, with a little research, you would learn that the average low temperature there is a lovely 68 degrees Fahrenheit (20 degrees Celsius) and the average high is a not unpleasant 80 degrees (26 degrees Celsius).",
        "In the 1930s, Shanghai was considered a great place for a swim. However, the YMCA’s sponsored swimming days had to be alternated between the two genders because male swimmers refused to swim with clothes on. They refused even special swimming clothes!",
        "In Seoul, customers can charge their cell phones using outlets in most stores. The plug-ins are open to the public in a very generous and convenient gesture.",
        "The popular energy drink, Red Bull, was actually created in Bangkok. The drink was changed slightly to match the tastes of westerners, but the original recipe is still available there.",
        "Montreal is famous for its riotous hockey fans. There have been 5 major city-wide riots over the sport in the past 60 years!",
        "Helsinki is the town of the headquarters of the company that produced the popular smartphone game, Angry Birds.",
        "Moscow’s public transportation is one of the fastest in the whole world, beating out just about every other country’s other than China and Japan.",
        "Aperitivo is the long-lived Milanese tradition of pre-dinner drinks accompanied by complimentary appetizers. Aperitivo is designed to stimulate the appetite previewing the delights of dinner. Foods can range from modest olives to delectable pasta, pizza, bruschetta, meats, sauteed vegetables, and fruit salads. Drinks come with unlimited admission to the food bar. The aperitivo starts at 6 or 7 p.m. and lasts until 9.",
        "The first tulips that arrived in Europe were actually sent from the Ottoman Empire. Although they are now associated with bavarian countries, they originated in the east.",
        "Remember hearing about those Spanish siestas? Socially acceptable naps in the middle of the day sound great to those of us where it’s not culturally accepted, but the Spanish tradition has actually faded as the country has modernized. Now hardly anyone in the city takes a siesta.",
        "The famous German fall festival, Oktoberfest, actually begins the month before. It’s two to three weeks long and begins half-way through September.",
        "There are 880,000 bicycles in comparison to a population of 800,000 city inhabitants, which means Amsterdam has more bicycles than people.",
        "Each year, Venice receives over 18 million tourists– close to 60,000 per day. The number of daily tourists now outnumber local residents, which threatens to destroy the city’s local population by driving up prices. Some analysts predict Venice will be a ghost town or an “amusement park” by 2030.",
        "The ballpoint pen, an office tool that is now used all around the world in just about every place imaginable, was invented there",
        "With a passenger terminal that is equivalent to the size of more than 45 football fields, Atlanta’s Hartsfield-Jackson International Airport holds the title of ‘the world’s busiest airport’.",
        "The Tiergarten Schonbrunn or Vienna Zoo dates back to 1752, making it the oldest zoo in the world. It’s high-quality animal care consistently places it among the top zoos in the world.",
        "Getting a car in Beijing is not so easy! Beijing citizens who wish to purchase passenger cars with less than five seats must wait for the monthly license plate lottery to see if their ticket was selected. This system was introduced to control road congestion and pollution.",
        "Because Mexico City was built on a soft lake bed, the city is sinking at a rate of 10cm per year – that’s 10 times faster than Venice.",
        "LA is even more crowded per square mile than New York City, packing in about 7,000 people, compared to New York’s already impressive 5,319.",
        "Athens has one of the lowest crime rates in all of Europe’s major cities, making it one of the safest options for travel.",
        "The original estimate to build the Sydney Opera House was AUD7 million. The project was completed 10 years late and more than fourteen times over budget. Still worth it, we think.",
        "Rome has a museum dedicated to pasta. The National Museum of Pasta extends across two floors and eleven rooms.",
        "In Tokyo, there are smart-toilets. In the city, the toilets can be adjusted for comfort in many ways including cushions, self-cleaning, and even heated seats.",
        "Because of the way the city is represented in the media, a lot of people fall prey to the misconception that Paris is a quaint, friendly little place that is bohemian heaven on earth. When tourists realize that in reality, the city is not what they had built it up to be in their minds, they are gripped with anxiety, a combination of physical and psychological symptoms that aren’t very pleasant to deal with. Psychologists have labeled this phenomenon as the Paris Syndrome.",
        "The famous indoor London marketplace, Harrod’s sold cocaine and cocaine-related products to shoppers until 1916, when people began guessing that the drug might actually have some negative effects.",
        "Manhattanhenge — sometimes referred to as the Manhattan Solstice — is an event during which the setting sun is aligned with the east-west streets of the main street grid of Manhattan, New York City. This occurs twice a year, on dates evenly spaced around the summer solstice.",

    ];

btn.addEventListener('click', function(){
    var randomTrivia = trivias[Math.floor(Math.random() * trivias.length)]
    output.innerHTML = randomTrivia;
})

// const canvas = document.getElementById("parallaxHome");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// class Background {
//     constructor(gamewidth, gameHeight){
//         this.gameWidth = gamewidth;
//         this.gameheight = gameHeight;
//         this.image = document.getElementById("home");
//         this.x = 0;
//         this.y = 0;
//         this.width = 1296;
//         this.height = 600;
//         this.speed = 5;
//     }

//     draw(context){
//         context.drawImage(
//             this.image, 
//             this.x,
//             this.y,
//             this.width,
//             this.height,
//         )
//         context.drawImage(
//             this.image, 
//             this.x + this.width,
//             this.y,
//             this.width,
//             this.height,
//         )
//     }

//     update(){
//         this.x -= this.speed;
//         if (this.x < 0 - this.width) this.x = 0;
//     }
// }

// const background = new Background(canvas.width, canvas.height);

// function animate(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     background.draw(ctx);
//     background.update();
//     requestAnimationFrame(animate);
// }
// animate();