const team = document.querySelector('.team');
const teamItems = document.querySelectorAll('.team__items');
const teamItemsLegth = teamItems.length;


team.addEventListener('click', function (e) {
    for (let i = 0; i < teamItemsLegth; i++) {
        teamItems[i].classList.remove('team__items--active');
    }
});
for (let i = 0; i < teamItemsLegth; i++) {
    teamItems[i].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (teamItems[i].classList.contains('team__items--active')) {
            (teamItems[i].classList.remove('team__items--active'));
        } else {
            for (let i = 0; i < teamItemsLegth; i++) {
                teamItems[i].classList.remove('team__items--active');
            }
            teamItems[i].classList.add('team__items--active');


        }
    });
}