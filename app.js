//==================DOM-content=========================
const page = document.body.id;
const body = document.querySelector("body");
const navbar_btn = document.querySelector(".navbar_menu");
const nav_container = document.querySelector(".nav_container ");
const reg_btn = document.querySelector("#reg_btn ");
const login_btn = document.querySelector("#login_btn ");
const popUp_remove_btn = document.querySelectorAll(".popUp_remove_btn ");
const dnt_have_acc_btn_a = document.querySelector("#dnt_have_acc_btn a ");
const register_box = document.querySelector(".register_box");
const user_account_box = document.querySelector(".user_account_box");
const user_resposive_account_box = document.querySelector(
    ".user_resposive_account_box"
);

//==================Functions=========================
function windowScroll() {
    if (window.screenX <= 400) {
        nav_container.classList.toggle("activeres", scrollY > 100);
    }

    nav_container.classList.toggle("active", scrollY > 100);
}

function navbarClick() {
    document.querySelector(".responsive_nav").classList.toggle("active");
    navbar_btn.classList.toggle("active");
}
function RegPopupClick() {
    document.querySelector(".reg_section").classList.add("active");
    body.classList.add("active");
}
function LoginPopupClick() {
    document.querySelector(".log_section").classList.add("active");
}
for (let i = 0; i < popUp_remove_btn.length; i++) {
    popUp_remove_btn[i].addEventListener("click", () => {
        document.querySelector(".reg_section").classList.remove("active");
        document.querySelector(".log_section").classList.remove("active");
        body.classList.remove("active");
    });
}
function regRedirectClick() {
    document.querySelector(".log_section").classList.remove("active");
    document.querySelector(".reg_section").classList.add("active");
}

if (register_box.classList.contains("active")) {
    user_resposive_account_box.classList.add("active");
}
if (!register_box.classList.contains("active")) {
    user_resposive_account_box.classList.remove("active");
}

switch (page) {
    case "index_BD":
        navbar_btn.addEventListener("click", navbarClick);
        window.addEventListener("scroll", windowScroll);
        reg_btn.addEventListener("click", RegPopupClick);
        login_btn.addEventListener("click", LoginPopupClick);
        dnt_have_acc_btn_a.addEventListener("click", regRedirectClick);

        fetch("json_folder/data_team.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (products) {
                let out = "";
                for (let product of products) {
                    out += `
            <li>
            <div class="first_team_img_box">
                <img
                    data-value="2"
                    src="${product.team_img}"
                    alt=""
                />
                <h2>${product.team_name}</h2>
            </div>
            <div class="match_date_box">
                <h3>${product.time}</h3>
                <p>${product.date}</p>
                <strong>${product.map}</strong>
            </div>
            <div class="second_team_img_box">
                <h2>${product.opon_name}</h2>
                <img
                    src="${product.opon_team_img}"
                    alt=""
                />
            </div>
        </li>
            `;
                }
                document.querySelector(".match_content ul").innerHTML = out;
            });

        break;

    case "liderboard_BD":
        navbar_btn.addEventListener("click", navbarClick);
        window.addEventListener("scroll", windowScroll);
        reg_btn.addEventListener("click", RegPopupClick);
        login_btn.addEventListener("click", LoginPopupClick);
        dnt_have_acc_btn_a.addEventListener("click", regRedirectClick);

        fetch("json_folder/player_ldb.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (player) {
                let maxPts = player[0].rating;
                for (let i = 0; i < player.length - 1; i++) {
                    for (let j = 0; j < player.length - i - 1; j++) {
                        if (player[j].rating < player[j + 1].rating) {
                            const swap = player[j].rating;
                            player[j].rating = player[j + 1].rating;
                            player[j + 1].rating = swap;
                        }
                        if (maxPts <= player[j].rating) {
                            maxPts = player[j].rating;
                        }
                    }
                }
                let print1 = "";
                let print2 = "";

                for (let i = 0; i < player.length; i++) {
                    const plr = player[i];
                    let playerbox = `
                <div class="best_player_box">
                <div class="best_plr_left_box">
                    <div class="plr_rating">
                        <strong>${plr.id}</strong>
                    </div>
                    <div class="plr_name">
                        <img
                            src="${plr.player_img}"
                            alt=""
                        />
                        <h3>${plr.player_name}</h3>
                    </div>
                </div>
                <div class="plr_pts">
                    <strong>${plr.rating} C</strong>
                </div>
                </div>`;

                    if (plr.id <= 5) {
                        print1 += playerbox;
                    } else {
                        print2 += playerbox;
                    }
                }
                document.querySelector(".best_player_top10_box").innerHTML =
                    print1;
                document.querySelector(".best_player_aftr10_box").innerHTML =
                    print2;
            });

        fetch("json_folder/team_ldb.json")
            .then(function (resp1) {
                return resp1.json();
            })
            .then(function (team) {
                for (let i = 0; i < team.length - 1; i++) {
                    for (let j = 0; j < team.length - i - 1; j++) {
                        if (
                            team[j].ldb_team_points <
                            team[j + 1].ldb_team_points
                        ) {
                            const swap = team[j];
                            team[j] = team[j + 1];
                            team[j + 1] = swap;
                        }
                    }
                }

                let prt3 = "";
                for (let i = 0; i < team.length; i++) {
                    const tm = team[i];
                    prt3 += `
                            <div class="best_player_box">
                            <div class="best_plr_left_box">
                                <div class="plr_rating">
                                    <strong>${i + 1}</strong>
                                </div>
                                <div class="plr_name">
                                    <img
                                        src="${tm.ldb_team_img}"
                                        alt=""
                                    />
                                    <h3>${tm.ldb_team_name}</h3>
                                </div>
                            </div>
                            <div class="team_static">
                                <strong>${tm.ldb_team_win}</strong>
                                <strong>${tm.ldb_team_loose}</strong>
                                <strong>${tm.ldb_team_points}</strong>
                            </div>
                            </div>
                        `;
                }
                document.querySelector(".team_static_box").innerHTML = prt3;
            });

        break;

    case "fantasy_BD":
        navbar_btn.addEventListener("click", navbarClick);
        window.addEventListener("scroll", windowScroll);
        reg_btn.addEventListener("click", RegPopupClick);
        login_btn.addEventListener("click", LoginPopupClick);
        dnt_have_acc_btn_a.addEventListener("click", regRedirectClick);

        fetch("json_folder/fantasy_team_data.json")
            .then((resp) => {
                return resp.json();
            })
            .then((fant) => {
                let print = "";
                for (let i = 0; i < fant.length; i++) {
                    let plr = fant[i];
                    print += `
                            <div class="fantasy_team_box_content">
                                <div class="fnt_team_name_box">
                                    <div>
                                        <img
                                            src="${plr.team_img}"
                                            alt=""
                                        />
                                        <h3>${plr.team_name}</h3>
                                    </div>
                                    <i class="fa-solid fa-caret-down"></i>
                                </div>
                                <ul>
                                    <li>
                                    ${plr.team_player1}
                                        <div>
                                            <p>${plr.player_POS_EF}</p>
                                            <strong>${plr.EF_price}</strong>
                                        </div>
                                    </li>
                                    <li>
                                    ${plr.team_player2}
                                        <div>
                                            <p>${plr.player_POS_IGL}</p>
                                            <strong>${plr.IGL_price}</strong>
                                        </div>
                                    </li>
                                    <li>
                                    ${plr.team_player3}
                                        <div>
                                            <p>${plr.player_POS_SUP}</p>
                                            <strong>${plr.SUP_price}</strong>
                                        </div>
                                    </li>
                                    <li>
                                    ${plr.team_player4}
                                        <div>
                                            <p>${plr.player_POS_AWP}</p>
                                            <strong>${plr.AWP_price}</strong>
                                        </div>
                                    </li>
                                    <li>
                                    ${plr.team_player5}
                                        <div>
                                            <p>${plr.player_POS_LUR}</p>
                                            <strong>${plr.LUR_price}</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            `;
                    document.querySelector(".fantasy_team_box").innerHTML =
                        print;
                }
                const fnt_team_name_box =
                    document.querySelectorAll(".fnt_team_name_box");
                const fantasy_team_box_content_UL = document.querySelectorAll(
                    ".fantasy_team_box_content ul"
                );
                const fantasy_team_box_content = document.querySelectorAll(
                    ".fantasy_team_box_content "
                );
                for (let i = 0; i < fant.length; i++) {
                    fnt_team_name_box[i].addEventListener("click", () => {
                        fantasy_team_box_content_UL[i].classList.toggle(
                            "active"
                        );
                        fnt_team_name_box[i].classList.toggle("active");
                    });
                }
            });
        break;
}
