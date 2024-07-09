        let money = 50;
        const weatherList = ['Heavy Rain', 'Cold Rain', 'Light Drizzle', 'Cold & Windy', 'Cold', 'Warm & Cloudy', 'Warm & Sunny', 'Hot & Cloudy', 'Hot & Sunny'];
        let day = 0;

        function startGame() {
            day++;
            document.getElementById('message').innerText = `Day ${day}`;
            document.getElementById('money').innerText = `You have $${money.toFixed(2)}`;
            let weather = weatherList[Math.floor(Math.random() * weatherList.length)];
            document.getElementById('weather').innerText = `The weather is ${weather}`;

            let cups = parseInt(document.getElementById('cups').value);
            let signs = parseInt(document.getElementById('signs').value);
            let price = parseFloat(document.getElementById('price').value);

            if (isNaN(cups) || isNaN(signs) || isNaN(price)) {
                alert('Please enter valid numbers for cups, signs, and price.');
                return;
            }

            money -= (cups * 0.15) + (signs * 0.50);
            if (money <= 0) {
                alert('You went bankrupt. Reload the page to play again.');
                return;
            }

            let sold = calculateSales(weather, price, cups, signs);
            let profit = (sold * price) - ((cups * 0.15) + (signs * 0.50));
            money += profit;

            document.getElementById('message').innerText += `\nYou sold ${sold} cups and made a profit of $${profit.toFixed(2)}`;
            document.getElementById('money').innerText = `You have $${money.toFixed(2)}`;
        }

        function calculateSales(weather, price, cups, signs) {
            let weatherPercent, moneyPercent, signsPercent;

            switch(weather) {
                case 'Heavy Rain': weatherPercent = 15; break;
                case 'Cold Rain': weatherPercent = 20; break;
                case 'Light Drizzle': weatherPercent = 25; break;
                case 'Cold & Windy': weatherPercent = 26; break;
                case 'Cold': weatherPercent = 35; break;
                case 'Warm & Cloudy': weatherPercent = 89; break;
                case 'Warm & Sunny': weatherPercent = 95; break;
                case 'Hot & Cloudy': weatherPercent = 92; break;
                case 'Hot & Sunny': weatherPercent = 100; break;
                default: weatherPercent = 50;
            }

            if (price < 1) {
                moneyPercent = 100;
            } else if (price >= 1 && price < 2) {
                moneyPercent = 85;
            } else if (price >= 2 && price < 3) {
                moneyPercent = 75;
            } else if (price >= 3 && price < 4) {
                moneyPercent = 20;
            } else {
                moneyPercent = 0;
            }

            let ratio = signs / cups;
            if (ratio >= 1) {
                signsPercent = 100;
            } else if (ratio < 1 && ratio > 0.9) {
                signsPercent = 95;
            } else if (ratio <= 0.9 && ratio > 0.8) {
                signsPercent = 80;
            } else if (ratio <= 0.8 && ratio > 0.7) {
                signsPercent = 70;
            } else if (ratio <= 0.7 && ratio > 0.5) {
                signsPercent = 55;
            } else if (ratio <= 0.5 && ratio > 0.3) {
                signsPercent = 30;
            } else {
                signsPercent = 10;
            }

            let val1 = (signsPercent + moneyPercent + weatherPercent) / 3;
            let soldPercent = val1 / 100;
            return Math.round(soldPercent * cups);
        }