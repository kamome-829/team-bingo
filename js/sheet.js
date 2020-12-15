$(() => {
    const make_col = (base) => {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        let list = [];
        for (let i = 1; i <= 5; i++) {
            // ランダムで値を取得
            let a = parseInt(Math.random() * arr.length);
            list.push(arr[a] + base);
            // 数字を重複させないため、元々のリストから値を削除する
            arr.splice(a, 1);
        }
        return list;
    };

    const make_table = () => {
        // B列、I列...とそれぞれで5つの数字をランダムで取得
        const col_b = make_col(1);
        const col_i = make_col(20);
        const col_n = make_col(40);
        const col_g = make_col(60);
        const col_o = make_col(80);

        const list = new Array(25);
        for (let i = 0; i < 5; i++) {
            list[i * 5 + 0] = col_b[i];
            list[i * 5 + 1] = col_i[i];
            list[i * 5 + 2] = col_n[i];
            list[i * 5 + 3] = col_g[i];
            list[i * 5 + 4] = col_o[i];
        }
        list[12] = 'free';
        return list;
    };

    const create_card = () => {
        let row = make_table();
        for (let i = 0; i < row.length; i++) {
            $('#bi' + i).text(row[i]);
        }
    };

    // 初期化関数
    const init = () => {
        create_card();

        // チェック状態を外す
        $('#bingo td').each(() => {
            $(this).removeClass('check');
        });
    };

    //した2つの関数を追加
    //freeを隠す
    const card_hide = (check) => {
        if (check == "bi12") {
            var obj = document.getElementById("bingo-create");
            obj.classList.add("cardnone");
            const text = 'true';
            localStorage.setItem('check', text);
        }
    };

    const first_hide = () => {
        if (localStorage.getItem('check')) {
            const text = localStorage.getItem('check');
            if (text == "true") {
                var obj = document.getElementById("bingo-create");
                obj.classList.add("cardnone");
            }
        }
    };

    // 初期
    init();
    //した一行を追加。ページ更新時に前回のfreeを押していたら「カードを選びなおす」が出なくなる。消したいならした一行をコメントアウト。
    first_hide();

    // カード作成 ボタンをクリックすると、初期化
    $('#bingo-create').click(() => {
        init();
    });

    // 番号をクリックすると、スタイルを変更するクラスをつけ外しできる
    $('#bingo td').click(function () {
        $(this).toggleClass('check');
        //下の一行を追加
        card_hide(this.id);
    });

});