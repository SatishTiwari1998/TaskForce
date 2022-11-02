
///// Lets Define Color Pallete objects

const colorPallete=[
    {c1:"#de6b48",c2:"#e5b181",c3:"#f4b9b2",c4:"#daedbd",c5:"#7dbbc3"},
    {c1:"#EB5E55",c2:"#3A3335",c3:"#D81E5B",c4:"#FDF0D5",c5:"#C6D8D3"},
    {c1:"#001514",c2:"#FBFFFE",c3:"#6B0504",c4:"#A3320B",c5:"#E6AF2E"},
    {c1:"#3D3A4B",c2:"#937666",c3:"#B19994",c4:"#D3C0CD",c5:"#E3DFFF"},
    {c1:"#A7CECB",c2:"#8BA6A9",c3:"#75704E",c4:"#CACC90",c5:"#F4EBBE"},
    {c1:"#582630",c2:"#A54657",c3:"#F26157",c4:"#5E747F",c5:"#F4EBBE"},
    {c1:"#5D737E",c2:"#55505C",c3:"#E0ACD5",c4:"#FF3366",c5:"#F4EBBE"},
    {c1:"#2274A5",c2:"#FADF63",c3:"#E6AF2E",c4:"#E7EB90",c5:"#632B30"},
    {c1:"#020887",c2:"#38369A",c3:"#7CA5B8",c4:"#A9DBB8",c5:"#C6EBBE"},
    {c1:"#736CED",c2:"#FEF9FF",c3:"#D4C1EC",c4:"#9F9FED",c5:"#F2DFD7"},
];





function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let themeNo=0;
let themechanged=false;

  



// get all the elements whose color need to be changed

const TT_navBar=document.querySelector("nav.navbar");
const TT_footer=document.querySelector("section.footer-section");
const TT_navTab=document.querySelector("nav.nav-large-devices div.nav-tabs");
const TT_navTabActive=document.querySelector("a.nav-item.active");

// Nav Tab buttons
const homeTab=document.getElementById("nav-home-tab");
const addTab=document.getElementById("nav-addTasks-tab");
const searchTab=document.getElementById("nav-searchTasks-tab");
const dashboardTab=document.getElementById("nav-dashboard-tab");


    // welcome page variables
    const TT_welcomePageBody=document.querySelector("section.welcome-page");
    const TT_accordionBody=document.querySelector("div.accordion-item");

    // to do app page
    const TT_inputField=document.querySelector("div.input-field");
    const TT_userInput=document.querySelector("div.input-field input");
    const TT_addButton=document.querySelector("div.input-field button");
    const TT_taskBox=document.querySelector("div.task-box");
    const TT_pendingBox=document.querySelector("div.task-display-box");
    const TT_pendingHeading=document.querySelector("div.task-display-box h2");
    const TT_pendingResetButton=document.querySelector("div.task-display-box button");

    const TT_priorityBox=document.querySelector("div.priority-task-display-box");
    const TT_priorityHeading=document.querySelector("div.priority-task-display-box h2");
    const TT_priorityResetButton=document.querySelector("div.priority-task-display-box button");

    const TT_completedBox=document.querySelector("div.completed-task-display-box");
    const TT_completedHeading=document.querySelector("div.completed-task-display-box h2");
    const TT_completedResetButton=document.querySelector("div.completed-task-display-box button");

    // Search Page
    const TT_searchInputBox=document.querySelector("section.search-section .input-field");
    const TT_searchInput=document.querySelector("section.search-section .input-field input");
    const TT_searchBox=document.querySelector("div.searched-items-display-box");
    const TT_searchBoxHeading=document.querySelector("div.searched-items-display-box h2");

    // Dashboard Page
    const TT_dashboardBody=document.getElementById("nav-dashboard");
    const TT_currentStatsTitle=document.querySelector("div.current-stats h3");
    const TT_overallStatsTitle=document.querySelector("div.overall-stats h3");
    const TT_pieChartsTitle=document.querySelector("div.pie-charts h3");
    const TT_current__Pending__TaskBox=document.querySelector("div.current-stats div.pending");
    const TT_current__Priority__TaskBox=document.querySelector("div.current-stats div.priority");
    const TT_current__Completed__TaskBox=document.querySelector("div.current-stats div.completed");

    const TT_overall__Created__TaskBox=document.querySelector("div.overall-stats div.created");
    const TT_overall__Priority__TaskBox=document.querySelector("div.overall-stats div.priority");
    const TT_overall__Completed__TaskBox=document.querySelector("div.overall-stats div.completed");
    const TT_overall__Deleted__TaskBox=document.querySelector("div.overall-stats div.deleted");
    





    

    








function applyTheme()
{
    let randomNumber=randomInt(0,9);
    themeNo=randomNumber;
    themechanged=true;
    console.log(themeNo);

    ///////// nav bar styling ///////////////
    TT_navBar.style.background=colorPallete[themeNo].c1;

    ///////// nav tab on theme change style ///////////////
    TT_navTab.style.background=colorPallete[themeNo].c2;
    TT_navTab.style.border="none";
    TT_navTabActive.style.background=colorPallete[themeNo].c4;
    TT_navTabActive.style.border="none";
    addTab.style.color="white";
    addTab.style.border="none";
    searchTab.style.color="white";
    searchTab.style.border="none";
    dashboardTab.style.color="white";
    dashboardTab.style.border="none";

    ///////// welcome page style ///////////////
    TT_welcomePageBody.style.background=colorPallete[themeNo].c4;

    ///////// add task page style ///////////////
    TT_inputField.style.background=colorPallete[themeNo].c4;
    TT_userInput.style.borderColor=colorPallete[themeNo].c1;
    TT_addButton.style.borderColor=colorPallete[themeNo].c1;
    TT_addButton.style.background=colorPallete[themeNo].c1;
    TT_taskBox.style.background=colorPallete[themeNo].c1;

    TT_pendingBox.style.background=colorPallete[themeNo].c3;
    TT_pendingHeading.style.color="white";
    TT_pendingResetButton.style.background=colorPallete[themeNo].c1;

    TT_priorityBox.style.background=colorPallete[themeNo].c4;
    TT_priorityHeading.style.color="white";
    TT_priorityResetButton.style.background=colorPallete[themeNo].c1;

    TT_completedBox.style.background=colorPallete[themeNo].c2;
    TT_completedHeading.style.color="white";
    TT_completedResetButton.style.background=colorPallete[themeNo].c1;


    ///////// serach page style ///////////////

    TT_searchInputBox.style.background=colorPallete[themeNo].c4;
    TT_searchInput.style.borderColor=colorPallete[themeNo].c1;
    TT_searchBox.style.background=colorPallete[themeNo].c2;
    TT_searchBoxHeading.style.color="white";

    /////////////// Dashboard Style //////////////
    TT_dashboardBody.style.background=colorPallete[themeNo].c4;
    TT_footer.style.background=colorPallete[themeNo].c1;
    TT_currentStatsTitle.style.color="white";
    TT_overallStatsTitle.style.color="white";
    TT_pieChartsTitle.style.color="white";

    TT_current__Pending__TaskBox.style.border=`1px solid ${colorPallete[themeNo].c1}`;
    TT_current__Pending__TaskBox.style.boxShadow="2px 2px 2px 2px rgba(0,0,0,0.2)";
    TT_current__Pending__TaskBox.style.boxShadow="-2px 2px 2px 2px rgba(0,195,0,0.2)";
    TT_current__Priority__TaskBox.style.border=`2px solid ${colorPallete[themeNo].c1}`;
    TT_current__Completed__TaskBox.style.border=`2px solid ${colorPallete[themeNo].c1}`;

    ///////// footer style ///////////////

    
}

document.getElementById("toggle-theme").addEventListener("dblclick",()=>{
    applyTheme();
})


/////////////////////////// NAV TAB Styling ///////////////



function homeTabStyle()
{
    if(themechanged===true)
    {
        homeTab.style.background=colorPallete[themeNo].c4;
        homeTab.style.border="none";

        homeTab.style.color="black";
        addTab.style.color="white";
        searchTab.style.color="white";
        dashboardTab.style.color="white";

        addTab.style.background=colorPallete[themeNo].c2;
        searchTab.style.background=colorPallete[themeNo].c2;
        dashboardTab.style.background=colorPallete[themeNo].c2;
    }
    else return;
    
}

function addTabStyle()
{
    if(themechanged===true)
    {
        homeTab.style.background=colorPallete[themeNo].c2;
        addTab.style.background=colorPallete[themeNo].c4;
        addTab.style.border="none";

        homeTab.style.color="white";
        addTab.style.color="black";
        searchTab.style.color="white";
        dashboardTab.style.color="white";

        searchTab.style.background=colorPallete[themeNo].c2;
        dashboardTab.style.background=colorPallete[themeNo].c2;
    }else return;
}

function searchTabStyle()
{
    if(themechanged===true)
    {
        homeTab.style.background=colorPallete[themeNo].c2;
        addTab.style.background=colorPallete[themeNo].c2;
        searchTab.style.background=colorPallete[themeNo].c4;
        searchTab.style.border="none";

        homeTab.style.color="white";
        addTab.style.color="white";
        searchTab.style.color="black";
        dashboardTab.style.color="white";

        dashboardTab.style.background=colorPallete[themeNo].c2;
    }else return;
    
}

function dashboardTabStyle()
{
    if(themechanged===true)
    {
        homeTab.style.background=colorPallete[themeNo].c2;
        addTab.style.background=colorPallete[themeNo].c2;
        searchTab.style.background=colorPallete[themeNo].c2;
        dashboardTab.style.background=colorPallete[themeNo].c4;
        dashboardTab.style.border="none"; 

        homeTab.style.color="white";
        addTab.style.color="white";
        searchTab.style.color="white";
        dashboardTab.style.color="black";
    }else return;
}

homeTab.addEventListener("click",homeTabStyle);
addTab.addEventListener("click",addTabStyle);
searchTab.addEventListener("click",searchTabStyle);
dashboardTab.addEventListener("click",dashboardTabStyle);

















