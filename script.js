$(function () {

    $(function () {
        let parent = $(".left-box");
        let divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });

    let funTimer = function () {
        let timer;
        $('.start').attr('disabled', 'disabled');
        $('.start').addClass('deactivate');
        $('.check').removeClass('deactivate');
        if ($('.time').html() == '01:00') {
            let seconds = 59;
            timer = setInterval(function () {
                if (seconds <= 9) {
                    seconds = '0' + seconds;
                }
                if (seconds == 0) {
                    $('.time').html('00:00');
                    clearInterval(timer);
                    $('.alert-modal').removeClass('hide');
                    $('.alert-modal-text').html("It's a pity, but you lost");
                    $('.check').attr('disabled', 'disabled');
                } else {
                    let strTimer = `00:${seconds}`;
                    $('.time').html(strTimer);
                    $('.modal-text').html(`You still have time, you sure? ${strTimer}`);
                }
                seconds--;
            }, 1000);
        }
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let check = true;
    
        $('.modal-check').on('click', function () {
            clearInterval(timer);
            for (let i = 0; i < $('.drag').length; i++) {
                if ($('.drop').eq(i).html() != numbers[i]) {
                    check = false;
                    break;
                }
            }
            if (check) {
                $('.alert-modal').removeClass('hide');
                $('.modal').addClass('hide');
                $('.alert-modal-text').html("Woohoo, well done, you did it!");
            } else {
                $('.alert-modal').removeClass('hide');
                $('.modal').addClass('hide');
                $('.alert-modal-text').html("It's a pity, but you lost(");
            }
            check = true;
        })
        $('.check').on('click', function () {
            $('.modal').removeClass('hide');
        })
    
        $('.close').on('click', function () {
            $('.modal').addClass('hide');
        })
    
        $('.alert-close').on('click', function(){
            $('.alert-modal').addClass('hide');
        })
    };

    $('.drag').draggable({
        cursor: 'move',
        containment: '.container'
    });
    $('.drop').droppable({
        accept: '.drag',
        activate: funTimer,
        drop: dropElem
    });
    function dropElem(event, ui) {
        $(this).html(ui.draggable.html());
        ui.draggable.position({
            of: $(this),
            my: 'left top',
            at: 'left top'
        })
    }

    $('.start').on('click', funTimer);

    $('.new').on('click', function(){
        location.reload();
    })
    
})