import './style.css'
import { destinations } from "./destination.js";


// PROFILE DATA
let profile =
    JSON.parse(localStorage.getItem("natureNestProfile")) || null;


// FAVORITES
let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


// PLANNED TRIPS
let plannedTrips =
    JSON.parse(localStorage.getItem("plannedTrips")) || [];

// SAVED DESTINATIONS
let savedDestinations =
    JSON.parse(localStorage.getItem("savedDestinations")) || [];


// DEFAULT PROFILE IMAGE

const DEFAULT_PROFILE_IMAGE =
    "/src/assets/profile/default-profile.jpg";


// DOM - PROFILE SETUP

const profileSetup =
    document.getElementById("profileSetup");

const profileDisplay =
    document.getElementById("profileDisplay");

const profileFormTitle =
    document.getElementById("profileFormTitle");

const profileName =
    document.getElementById("profileName");

const profileBio =
    document.getElementById("profileBio");

const profileImage =
    document.getElementById("profileImage");

const profileImageInput =
    document.getElementById("profileImageInput");

const nameInput =
    document.getElementById("nameInput");

const bioInput =
    document.getElementById("bioInput");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const deleteProfileBtn =
    document.getElementById("deleteProfileBtn");


// DOM - COUNTS

const favoriteCount =
    document.getElementById("favoriteCount");

const plannedCount =
    document.getElementById("plannedCount");

const saveCount =
    document.getElementById("saveCount");


// GET LATEST STORAGE DATA

function loadLatestStorageData() {

    favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    plannedTrips =
        JSON.parse(localStorage.getItem("plannedTrips") ) || [];

    savedDestinations =
        JSON.parse(localStorage.getItem("savedDestinations")) || [];

}


// UPDATE COUNTS

function updateDestinationCounts() {

    // Get latest data first

    loadLatestStorageData();

     // FAVORITES COUNT

    if (favoriteCount) {

        favoriteCount.textContent =
            favorites.length;

    }

    // PLANNED TRIPS COUNT

    if (plannedCount) {

        plannedCount.textContent =
            plannedTrips.length;

    }


    // SAVED DESTINATIONS COUNT

    if (saveCount) {

        saveCount.textContent =
            savedDestinations.length;

    }

}


// SHOW PROFILE

function showProfile() {

    // IF PROFILE DOES NOT EXIST

    if (!profile) {

        showProfileSetup();

        return;

    }


    // HIDE SETUP FORM

    if (profileSetup) {

        profileSetup.classList.add("hidden");

    }


    // SHOW PROFILE DISPLAY

    if (profileDisplay) {

        profileDisplay.classList.remove("hidden");

    }


    // PROFILE NAME

    if (profileName) {

        profileName.textContent =
            profile.name ||"Nature Explorer";

    }


    // PROFILE BIO

    if (profileBio) {

        profileBio.textContent =
            profile.bio ||"Travel lover and nature explorer.";

    }


    // PROFILE IMAGE

    if (profileImage) {

        profileImage.src =
            profile.image ||DEFAULT_PROFILE_IMAGE;

        profileImage.alt =
            profile.name? `${profile.name}'s profile picture`: "Profile picture";

    }

    // UPDATE COUNTS

    updateDestinationCounts();

}


// SHOW PROFILE SETUP

function showProfileSetup() {

    // HIDE PROFILE DISPLAY

    if (profileDisplay) {

        profileDisplay.classList.add("hidden");

    }


    // SHOW SETUP FORM

    if (profileSetup) {

        profileSetup.classList.remove("hidden");

    }


    // FORM TITLE

    if (profileFormTitle) {

        profileFormTitle.textContent ="Create Your Profile";

    }


    // BUTTON TEXT

    if (saveProfileBtn) {

        saveProfileBtn.textContent ="Save Profile";

    }

    // CLEAR NAME

    if (nameInput) {

        nameInput.value = "";

    }


    // CLEAR BIO

    if (bioInput) {

        bioInput.value = "";

    }


    // CLEAR IMAGE INPUT

    if (profileImageInput) {

        profileImageInput.value = "";

    }

    // HIDE CANCEL BUTTON

    if (cancelEditBtn) {

        cancelEditBtn.classList.add("hidden");

    }

}


// SHOW EDIT PROFILE

function showEditProfile() {

    // IF PROFILE DOES NOT EXIST

    if (!profile) {

        showProfileSetup();

        return;

    }


    // SHOW FORM

    if (profileSetup) {

        profileSetup.classList.remove("hidden");

    }

    // HIDE PROFILE DISPLAY

    if (profileDisplay) {

        profileDisplay.classList.add("hidden" );

    }

    // FORM TITLE

    if (profileFormTitle) {

        profileFormTitle.textContent = "Edit Your Profile";

    }


    // BUTTON TEXT

    if (saveProfileBtn) {

        saveProfileBtn.textContent ="Save Changes";

    }


    // LOAD CURRENT NAME

    if (nameInput) {

        nameInput.value =profile.name || "";

    }


    // LOAD CURRENT BIO

    if (bioInput) {

        bioInput.value =
            profile.bio || "";

    }


    // IMAGE INPUT

    // Browser security does not allow
    // setting an existing file input value.

    if (profileImageInput) {

        profileImageInput.value = "";

    }


    // SHOW CANCEL

    if (cancelEditBtn) {

        cancelEditBtn.classList.remove("hidden");

    }

}


// SAVE PROFILE

function saveProfile(name,bio,image) {

    profile = {

        name: name,

        bio:
            bio ||"Travel lover and nature explorer.",

        image:
            image ||DEFAULT_PROFILE_IMAGE

    };


    // SAVE TO LOCAL STORAGE

    localStorage.setItem("natureNestProfile",JSON.stringify(profile));


    // SHOW PROFILE

    showProfile();


    // SUCCESS MESSAGE

    alert("Profile saved successfully!");

}


// SAVE PROFILE BUTTON

if (saveProfileBtn) {

    saveProfileBtn.addEventListener("click",function () {

            // GET NAME

            const name =
                nameInput? nameInput.value.trim(): "";

            // GET BIO
            const bio =
                bioInput? bioInput.value.trim(): "";


            // NAME REQUIRED

            if (!name) {

                alert("Please enter your name.");

                if (nameInput) {

                    nameInput.focus();

                }

                return;

            }

            // GET SELECTED IMAGE

            const file =
                profileImageInput?.files?.[0];

            // NEW IMAGE SELECTED

            if (file) {

                const reader =
                    new FileReader();


                reader.onload =function (event) {

                        saveProfile(name,bio,event.target.result);

                    };


                reader.onerror =function () {

                        alert("Unable to read the selected image.");

                    };

                reader.readAsDataURL(file);

            }

            // NO NEW IMAGE

            else {

                // While editing:
                // keep old image.

                const image =
                    profile?.image ||DEFAULT_PROFILE_IMAGE;

                saveProfile(name,bio,image);
            }
        }
    );
}


// EDIT PROFILE BUTTON

if (editProfileBtn) {

    editProfileBtn.addEventListener("click",function () {

            showEditProfile();

        }
    );
}


// CANCEL EDIT

if (cancelEditBtn) {

    cancelEditBtn.addEventListener("click",function () {

            if (profile) {

                showProfile();
            }

            else {

                showProfileSetup();
            }
        }
    );
}


// DELETE PROFILE

if (deleteProfileBtn) {

    deleteProfileBtn.addEventListener("click",function () {

            // CHECK PROFILE

            if (!profile) {

                alert("No profile exists to delete.");
                return;
            }

            // CONFIRM

            const confirmDelete =
                confirm("Are you sure you want to delete your profile? This action cannot be undone.");

            if (!confirmDelete) {

                return;
            }

            // DELETE PROFILE ONLY

            localStorage.removeItem("natureNestProfile");

            // RESET PROFILE

            profile = null;

            // SHOW CREATE PROFILE

            showProfileSetup();


            // SUCCESS MESSAGE

            alert("Your profile has been deleted successfully.");
        }
    );
}


// OPEN FAVORITES PAGE

if (favoriteCount) {

    const favoriteCard =
        favoriteCount.closest("div");


    if (favoriteCard) {

        favoriteCard.style.cursor =
            "pointer";


        favoriteCard.addEventListener("click",function () {

                // Update latest count

                loadLatestStorageData();

                // Open separate page

                window.location.href =
                    "favorites.html";
            }
        );
    }
}


// OPEN PLANNED TRIPS PAGE

if (plannedCount) {

    const plannedCard =
        plannedCount.closest("div");

    if (plannedCard) {

        plannedCard.style.cursor =
            "pointer";


        plannedCard.addEventListener("click",function () {

                // Update latest count

                loadLatestStorageData();


                // Open separate page

                window.location.href =
                    "planned-trips.html";
            }
        );
    }
}


// OPEN SAVED DESTINATIONS PAGE

if (saveCount) {

    const savedCard =
        saveCount.closest("div");

    if (savedCard) {

        savedCard.style.cursor =
            "pointer";


        savedCard.addEventListener("click",function () {

                // Update latest count

                loadLatestStorageData();

                // Open separate page

                window.location.href =
                    "saved.html";
            }
        );
    }
}


// UPDATE COUNTS WHEN PAGE BECOMES VISIBLE

document.addEventListener("visibilitychange",function () {

        if (document.visibilityState ==="visible") {

            updateDestinationCounts();

        }
    }
);


// INITIAL LOAD

if (profile) {

    showProfile();

}

else {

    showProfileSetup();

}