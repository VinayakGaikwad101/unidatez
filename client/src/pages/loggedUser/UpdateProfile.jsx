import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";

const UpdateProfile = () => {
  const { authUser } = useAuthStore();
  const { updateProfile, loading } = useUserStore();
  const [name, setName] = useState(authUser.name || "");
  const [age, setAge] = useState(authUser.age || "");
  const [gender, setGender] = useState(authUser.gender || "");
  const [genderPreference, setGenderPreference] = useState(
    authUser.genderPreference || []
  );
  const [collegeStream, setCollegeStream] = useState(
    authUser.collegeStream || ""
  );
  const [unidatezFor, setUnidatezFor] = useState(authUser.unidatezFor || "");
  const [topSpotifyArtist, setTopSpotifyArtist] = useState(
    authUser.topSpotifyArtist || ""
  );
  const [favouriteMovieSeries, setFavouriteMovieSeries] = useState(
    authUser.favouriteMovieSeries || ""
  );
  const [topSongsOnSpotify, setTopSongsOnSpotify] = useState(
    authUser.topSongsOnSpotify || ""
  );
  const [pronouns, setPronouns] = useState(authUser.pronouns || "");
  const [collegeYear, setCollegeYear] = useState(authUser.collegeYear || "");
  const [homeState, setHomeState] = useState(authUser.homeState || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [image, setImage] = useState(authUser.image || null);

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log(reader.result); // Logs Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      age,
      gender,
      genderPreference,
      collegeStream,
      unidatezFor,
      topSpotifyArtist,
      favouriteMovieSeries,
      topSongsOnSpotify,
      pronouns,
      collegeYear,
      homeState,
      bio,
      image,
    };
    updateProfile(formData);
  };

  const inputClasses =
    "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none";

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <form
        className="z-10 w-full max-w-lg space-y-8 bg-white p-10 rounded-xl shadow-xl lg:max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Update Your Profile
          </h2>
          <p className="text-sm text-gray-600">
            Let's make your profile shine!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleImageChange}
              placeholder="Your Name"
              className={inputClasses}
              id="name"
            />
          </div>
          {image && (
            <div>
              <img src={image} alt="your profile image" />
            </div>
          )}
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your Age"
              className={inputClasses}
              id="age"
            />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <div className="flex gap-2">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="genderPreference">Gender Preference:</label>
            <div className="flex gap-2">
              <label>
                <input
                  type="radio"
                  name="genderPreference"
                  value="Male"
                  checked={genderPreference === "Male"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="genderPreference"
                  value="Female"
                  checked={genderPreference === "Female"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="genderPreference"
                  value="Both"
                  checked={genderPreference === "Both"}
                  onChange={(e) => setGenderPreference(e.target.value)}
                />{" "}
                Both
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="collegeStream">College Stream:</label>
            <select
              name="collegeStream"
              value={collegeStream}
              onChange={(e) => setCollegeStream(e.target.value)}
              className={inputClasses}
              id="collegeStream"
            >
              <option value="">Select College Stream</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical and computer science">
                Electrical and computer science
              </option>
              <option value="Electronic and communication">
                Electronic and communication
              </option>
              <option value="Computer science">Computer science</option>
              <option value="Civil">Civil</option>
              <option value="Chemical">Chemical</option>
              <option value="Health sciences and technology">
                Health sciences and technology
              </option>
              <option value="Electrical and electronics">
                Electrical and electronics
              </option>
              <option value="Electrical and instrumentation">
                Electrical and instrumentation
              </option>
              <option value="Information technology">
                Information technology
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="unidatezFor">Purpose on UniDates:</label>
            <select
              name="unidatezFor"
              value={unidatezFor}
              onChange={(e) => setUnidatezFor(e.target.value)}
              className={inputClasses}
              id="unidatezFor"
            >
              <option value="">Select Purpose</option>
              <option value="Friendship">Friendship</option>
              <option value="Networking">Networking</option>
              <option value="Study Partner">Study Partner</option>
              <option value="Just Here to Explore">Just Here to Explore</option>
            </select>
          </div>

          <div>
            <label htmlFor="topSpotifyArtist">Top Spotify Artist:</label>
            <input
              type="text"
              name="topSpotifyArtist"
              value={topSpotifyArtist}
              onChange={(e) => setTopSpotifyArtist(e.target.value)}
              placeholder="Your Top Spotify Artist"
              className={inputClasses}
              id="topSpotifyArtist"
            />
          </div>

          <div>
            <label htmlFor="favouriteMovieSeries">
              Favourite Movie/Series:
            </label>
            <input
              type="text"
              name="favouriteMovieSeries"
              value={favouriteMovieSeries}
              onChange={(e) => setFavouriteMovieSeries(e.target.value)}
              placeholder="Your Favourite Movie/Series"
              className={inputClasses}
              id="favouriteMovieSeries"
            />
          </div>

          <div>
            <label htmlFor="topSongsOnSpotify">Top Songs on Spotify:</label>
            <input
              type="text"
              name="topSongsOnSpotify"
              value={topSongsOnSpotify}
              onChange={(e) => setTopSongsOnSpotify(e.target.value)}
              placeholder="Your Top Songs on Spotify"
              className={inputClasses}
              id="topSongsOnSpotify"
            />
          </div>

          <div>
            <label htmlFor="pronouns">Pronouns:</label>
            <input
              type="text"
              name="pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="Your Pronouns"
              className={inputClasses}
              id="pronouns"
            />
          </div>

          <div>
            <label htmlFor="collegeYear">College Year:</label>
            <select
              name="collegeYear"
              value={collegeYear}
              onChange={(e) => setCollegeYear(e.target.value)}
              className={inputClasses}
              id="collegeYear"
            >
              <option value="">Select College Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="homeState">Home State:</label>
            <input
              type="text"
              name="homeState"
              value={homeState}
              onChange={(e) => setHomeState(e.target.value)}
              placeholder="Your Home State"
              className={inputClasses}
              id="homeState"
            />
          </div>

          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className={`${inputClasses} h-32 resize-none`}
              id="bio"
            />
          </div>

          <div>
            <label htmlFor="image">Profile Image:</label>
            <button type="button" onClick={() => fileInputRef.current.click()}>
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
