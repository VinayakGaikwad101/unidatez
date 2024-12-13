import { Heart, Users, BookOpen } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-2 md:px-8 lg:px-16 bg-[url('/aboutBg.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="w-full max-w-4xl rounded-lg p-0 md:p-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-left pl-0 md:pl-8">
          Welcome to UniDatez!
        </h2>
        <div className="space-y-6 text-left pl-0 md:pl-8">
          <p className="text-xl md:text-2xl font-semibold">
            Looking for a fun and easy way to connect with someone special or
            make a new friend who shares your interests, passions, and academic
            journey? You've come to the right place!
          </p>

          <p className="text-lg md:text-xl">
            UniDatez is your go-to platform for building meaningful connections,
            designed exclusively for university students like YOU. Whether
            you're searching for the perfect partner, a fun friend, or even a
            study buddy, we've got you covered!
          </p>

          <div className="my-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              What makes us different?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Heart className="text-red-600 mr-3" size={24} />
                <span className="text-lg">
                  Shared Interests: Meet people who share your passions.
                </span>
              </li>
              <li className="flex items-center">
                <Users className="text-blue-600 mr-3" size={24} />
                <span className="text-lg">
                  Campus Connections: Find students from your university or
                  explore connections beyond your campus.
                </span>
              </li>
              <li className="flex items-center">
                <BookOpen className="text-green-600 mr-3" size={24} />
                <span className="text-lg">
                  Student-Friendly: Our platform is simple, intuitive, and
                  designed to fit your busy student life.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-lg md:text-xl font-semibold">
            If you're ready to dive in and explore, scroll up and drop your
            email so we can let you know as soon as our website is up and
            running!
          </p>

          <div className="text-left mt-8">
            <p className="text-2xl font-bold">Thank you!</p>
            <p className="text-xl italic">Let's make connections that count!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
