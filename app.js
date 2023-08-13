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
const chosen_boxes = document.querySelectorAll(".chosen_boxes");
const grp_ttl1 = document.querySelector(".grp_ttl1");
const grp_brck1 = document.querySelector(".grp_brck1");
const list_1 = document.querySelector(".list_1");

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

        document.addEventListener("DOMContentLoaded", () => {
            let fantasyData;
            const fantasyStatisticBoxTable = document.querySelector(
                ".fantasy_statistic_box table"
            );
            const selectedPlayers = [];

            fetch("json_folder/fantasy_team_data.json")
                .then((resp) => {
                    return resp.json();
                })
                .then((fant) => {
                    fantasyData = fant;
                    let print = "";
                    for (let i = 0; i < fant.length; i++) {
                        let plr = fant[i];
                        let teamName = plr.team_name.toLowerCase();

                        let playerIndexes = [
                            "player1",
                            "player2",
                            "player3",
                            "player4",
                            "player5",
                        ];
                        let dataTeamPlayers = playerIndexes.map(
                            (player, index) =>
                                `${teamName}-${player}${index + 1}`
                        );

                        print += `
                            <div class="fantasy_team_box_content">
                                <div class="fnt_team_name_box">
                                    <div>
                                        <img src="${plr.team_img}" alt="" />
                                        <h3>${plr.team_name}</h3>
                                    </div>
                                    <i class="fa-solid fa-caret-down"></i>
                                </div>
                                <ul>
                                    <li draggable="true" data-player-id="${i}-${teamName}" data-team-player="${dataTeamPlayers[0]}">
                                        ${plr.team_player1}
                                        <div>
                                            <p>${plr.player_POS_1}</p>
                                            <strong>${plr.EF_price}</strong>
                                        </div>
                                    </li>
                                    <li draggable="true" data-player-id="${i}-${teamName}" data-team-player="${dataTeamPlayers[1]}">
                                        ${plr.team_player2}
                                        <div>
                                            <p>${plr.player_POS_2}</p>
                                            <strong>${plr.IGL_price}</strong>
                                        </div>
                                    </li>
                                    <li draggable="true" data-player-id="${i}-${teamName}" data-team-player="${dataTeamPlayers[2]}">
                                        ${plr.team_player3}
                                        <div>
                                            <p>${plr.player_POS_3}</p>
                                            <strong>${plr.SUP_price}</strong>
                                        </div>
                                    </li>
                                    <li draggable="true" data-player-id="${i}-${teamName}" data-team-player="${dataTeamPlayers[3]}">
                                        ${plr.team_player4}
                                        <div>
                                            <p>${plr.player_POS_4}</p>
                                            <strong>${plr.AWP_price}</strong>
                                        </div>
                                    </li>
                                    <li draggable="true" data-player-id="${i}-${teamName}" data-team-player="${dataTeamPlayers[4]}">
                                        ${plr.team_player5}
                                        <div>
                                            <p>${plr.player_POS_5}</p>
                                            <strong>${plr.LUR_price}</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        `;

                        document.querySelector(".fantasy_team_box").innerHTML =
                            print;
                    }

                    const leftColumnPlayers = document.querySelectorAll(
                        ".fantasy_team_box_content ul li"
                    );

                    leftColumnPlayers.forEach((player) => {
                        player.addEventListener("dragstart", (e) => {
                            let teamIndex =
                                e.currentTarget.dataset.playerId.split("-")[0];
                            let teamName =
                                e.currentTarget.dataset.teamPlayer.split(
                                    "-"
                                )[0];
                            let playerName =
                                e.currentTarget.dataset.teamPlayer.split(
                                    "-"
                                )[1];
                            e.dataTransfer.setData(
                                "text/plain",
                                `${teamIndex}-${teamName}-${playerName}`
                            );
                        });
                    });

                    chosen_boxes.forEach((singlePl) => {
                        let startCoords = { x: 0, y: 0 };

                        singlePl.addEventListener("dragstart", (e) => {
                            isDragging = true;
                            startCoords.x = e.clientX;
                            startCoords.y = e.clientY;
                        });

                        singlePl.addEventListener("drag", (e) => {
                            if (isDragging && window.innerWidth < 600) {
                                const bottomThreshold =
                                    window.innerHeight * 0.9; // Adjust the threshold as needed
                                const horizontalThreshold =
                                    window.innerWidth * 0.1; // Adjust the threshold as needed

                                const deltaY = Math.abs(
                                    e.clientY - startCoords.y
                                );
                                const deltaX = Math.abs(
                                    e.clientX - startCoords.x
                                );

                                if (
                                    deltaY > deltaX &&
                                    e.clientY > bottomThreshold &&
                                    deltaX < horizontalThreshold
                                ) {
                                    const fantasyChosenPlayerBox =
                                        document.querySelector(
                                            ".fantasy_chosen_player_box"
                                        );
                                    fantasyChosenPlayerBox.scrollIntoView({
                                        behavior: "smooth",
                                        block: "end",
                                    });
                                }
                            }
                        });

                        singlePl.addEventListener("dragend", () => {
                            isDragging = false;
                        });

                        singlePl.addEventListener("dragover", (e) => {
                            e.preventDefault();
                            singlePl.classList.add("dropped");
                        });
                        0;
                        singlePl.addEventListener("dragleave", () => {
                            singlePl.classList.remove("dropped");
                        });

                        singlePl.addEventListener("drop", (e) => {
                            e.preventDefault();
                            singlePl.classList.remove("dropped");

                            // Get the player ID from the dragged player element
                            let [teamIndex, teamName, playerName] =
                                e.dataTransfer.getData("text/plain").split("-");

                            // Make sure the fantasyData is available and contains the specified teamIndex
                            if (!fantasyData || !fantasyData[teamIndex]) {
                                console.error(
                                    "Fantasy data is not available or does not contain the specified teamIndex."
                                );
                                return;
                            }

                            // Get the player's index and name
                            let playerIndex =
                                Number(singlePl.dataset.index) - 1;
                            // Get the URL of the player's image from the fantasyData object
                            let playerImgUrl =
                                fantasyData[teamIndex][
                                    `player${playerIndex + 1}_img`
                                ];

                            let playerNm =
                                fantasyData[teamIndex][
                                    `team_player${playerIndex + 1}`
                                ];
                            let playerTeam =
                                fantasyData[teamIndex]["team_name"];

                            let playerPosition =
                                fantasyData[teamIndex][
                                    `player_POS_${playerIndex + 1}`
                                ];
                            let playerPrice =
                                fantasyData[teamIndex][
                                    `${playerPosition}_price`
                                ];

                            // Create an image element with the player's image and add it to the circle
                            let playerImg = document.createElement("img");
                            playerImg.src = playerImgUrl;

                            // Remove any existing image in the circle and add the new one
                            singlePl.innerHTML = "";
                            singlePl.appendChild(playerImg);

                            if (window.innerWidth < 600) {
                                singlePl.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                            }
                            selectedPlayers[playerIndex] = {
                                playerNm,
                                playerTeam: fantasyData[teamIndex]["team_name"],
                                playerPosition:
                                    fantasyData[teamIndex][
                                        `player_POS_${playerIndex + 1}`
                                    ],
                                playerPrice:
                                    fantasyData[teamIndex][
                                        `${
                                            fantasyData[teamIndex][
                                                `player_POS_${playerIndex + 1}`
                                            ]
                                        }_price`
                                    ],
                                circle: singlePl,
                            };

                            updateFantasyStatisticBoxTable();
                        });
                    });

                    window.addEventListener("orientationchange", () => {
                        if (isDragging) {
                            isOrientationChanged = true;
                        }
                    });

                    function updateFantasyStatisticBoxTable() {
                        fantasyStatisticBoxTable.innerHTML = `
                            <tr>
                                <th>Player</th>
                                <th>Team</th>
                                <th>Position</th>
                                <th>Price</th>
                            </tr>
                        `;
                        selectedPlayers.forEach((playerInfo, index) => {
                            if (playerInfo) {
                                const {
                                    playerNm,
                                    playerTeam,
                                    playerPosition,
                                    playerPrice,
                                } = playerInfo;
                                const playerInfoRow =
                                    document.createElement("tr");
                                playerInfoRow.innerHTML = `
                                    <td>${playerNm}</td>
                                    <td>${playerTeam}</td>
                                    <td>${playerPosition}</td>
                                    <td>${playerPrice}</td>
                                    <td><i class="fa-solid fa-trash delete-icon" data-player-index="${index}"></i></td>
                                `;
                                fantasyStatisticBoxTable.appendChild(
                                    playerInfoRow
                                );
                            }
                        });

                        attachDeleteListeners();
                    }

                    function attachDeleteListeners() {
                        const deleteIcons =
                            document.querySelectorAll(".delete-icon");

                        // Attach event listeners
                        deleteIcons.forEach((icon, index) => {
                            icon.addEventListener("click", (event) =>
                                handleDeletePlayer(event, index)
                            );
                        });
                    }

                    let deleteInProgress = false;

                    function handleDeletePlayer(event, index) {
                        if (!deleteInProgress && selectedPlayers[index]) {
                            deleteInProgress = true;

                            // Clear the circle in which the player's image is displayed
                            selectedPlayers[index].circle.innerHTML = "";

                            // Remove the player from the selectedPlayers array
                            selectedPlayers.splice(index, 1);

                            // Update the table and reattach delete listeners
                            updateFantasyStatisticBoxTable();
                            attachDeleteListeners();

                            setTimeout(() => {
                                deleteInProgress = false;
                            }, 100);
                        }
                    }

                    const fnt_team_name_box =
                        document.querySelectorAll(".fnt_team_name_box");
                    const fantasy_team_box_content_UL =
                        document.querySelectorAll(
                            ".fantasy_team_box_content ul"
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
        });
        break;

    case "games_BD":
        navbar_btn.addEventListener("click", navbarClick);
        window.addEventListener("scroll", windowScroll);
        reg_btn.addEventListener("click", RegPopupClick);
        login_btn.addEventListener("click", LoginPopupClick);
        dnt_have_acc_btn_a.addEventListener("click", regRedirectClick);
        grp_ttl1.addEventListener("click", grpttl1Click);

        function grpttl1Click() {
            grp_brck1.classList.toggle("active");
            grp_ttl1.classList.toggle("active");
            list_1.classList.toggle("active");
        }

        fetch("json_folder/team_ldb.json")
            .then((resp) => {
                return resp.json();
            })
            .then((atnd) => {
                let print = "";
                for (let i = 0; i < atnd.length; i++) {
                    let plr = atnd[i];
                    print += `
                            <div class="team_box">
                            <div class="team_img">
                                <img
                                    src="${plr.ldb_team_img}"
                                    alt="#"
                                />
                            </div>
                            <div class="team_title">
                                <h3>${plr.ldb_team_name}</h3>
                            </div>
                            <div class="team_place">#${plr.id}</div>
                            </div>
                            `;
                    document.querySelector(".teams_attend_box").innerHTML =
                        print;
                }
            });

        break;
}
