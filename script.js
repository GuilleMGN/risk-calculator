$(document).ready(function () {
    $('#riskForm').submit(function (e) {
        e.preventDefault();

        // Receive assigned user input values
        const accountBalance = parseFloat($('#accountBalance').val());
        const leverage = parseFloat($('#leverage').val());
        const maxRisk = parseFloat($('#maxRisk').val());
        const entryPrice = parseFloat($('#entryPrice').val());
        const stopLoss = parseFloat($('#stopLoss').val());

        // Calculate values
        const riskAmount = accountBalance * (maxRisk / 100);
        const takeProfit = entryPrice + ((entryPrice - stopLoss) * 2);
        const margin = Math.abs((riskAmount / (entryPrice - stopLoss)) * entryPrice / leverage);
        const positionSize = margin * leverage;
        const unitAmount = (positionSize / entryPrice);

        // Determine if position is Long or Short
        if (entryPrice < stopLoss) {
            const long = false;
            $('#long-short').html(`Short`);
            $('.title:nth-child(2)').css({"border-top-color": "#e2464a"});
        } else {
            const long = true;
            $('#long-short').html(`Long`);
            $('.title:nth-child(2)').css({"border-top-color": "#40ad9b"});
        }

        // Output results into HTML
        $('#account-balance-output').html(`<span id="account-balance-output" class="text-muted">Account Balance: $${accountBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`);
        $('#margin-output').html(`<span id="margin-output" class="text-warning"><a type="button" id="copy-margin">$${margin.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</a></span>`);
        $('#profit-output').html(`<span id="profit-output" class="text-muted">Profit: <span class="text-success">+$${(riskAmount * 2).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></small>`);
        $('#take-profit-output').html(`<span id="take-profit-output" class="text-success"><a type="button" id="copy-profit">$${takeProfit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</a></span>`);
        $('#loss-output').html(`<span id="loss-output" class="text-muted">Loss: <span class="text-danger">-$${riskAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></span>`);
        $('#stop-loss-output').html(`<span id="stop-loss-output" class="text-danger"><a type="button" id="copy-loss">$${stopLoss.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</a></span>`);
        $('#unit-amount-output').html(`<span id="unit-amount-output" class="text-muted">Unit Amount: ${unitAmount.toFixed(5).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`);
        $('#entry-price-output').html(`<span id="entry-price-output" class="text-muted">$${entryPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`);

        // Copy values to clipboard on click
        $("#copy-margin").click(function () {
            console.time('time1');
            var temp = $("<input>");
            $("body").append(temp);
            temp.val(margin).select();
            document.execCommand("copy");
            temp.remove();
            console.timeEnd('time1');
        });
        $("#copy-profit").click(function () {
            console.time('time1');
            var temp = $("<input>");
            $("body").append(temp);
            temp.val(takeProfit).select();
            document.execCommand("copy");
            temp.remove();
            console.timeEnd('time1');
        });
        $("#copy-loss").click(function () {
            console.time('time1');
            var temp = $("<input>");
            $("body").append(temp);
            temp.val(stopLoss).select();
            document.execCommand("copy");
            temp.remove();
            console.timeEnd('time1');
        });
    });

    // Toggle dark/light theme
    $('#image-link').click(function () {
        const img1_src = "calculator-white.png";
        const img2_src = "calculator-black.png";
        $('.text-center').toggleClass('toggle');
        $('.form-control').toggleClass('toggle');
        $('.list-group-item').toggleClass('toggle');
        $('.text-left').toggleClass('toggle');
        $('.list-group').toggleClass('toggle');
        $('.input-group-text').toggleClass('toggle');

        if ($("#image").attr("src") == img1_src) {
            $("#image").attr("src", img2_src);
        } else {
            $("#image").attr("src", img1_src);
        }
    });
});
