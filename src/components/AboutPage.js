import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Award, Users, Target, Eye, Heart, Building2, Calendar, MapPin } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observerRef = useRef(null);

  const startCounter = useCallback(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [startCounter]); // Added startCounter to dependency array

  return <span ref={countRef}>{count}</span>;
};

const AboutPage = ({ siteContent, editMode, updateContent }) => {
  // Sample data - you can replace this with your actual data
  const [aboutData, setAboutData] = React.useState({
    mission: "To create innovative, sustainable architectural solutions that enhance lives and communities while respecting the environment.",
    vision: "To be the leading architectural firm in East Africa, recognized for design excellence and transformative projects.",
    values: [
      { icon: <Eye size={24} />, title: "Innovation", description: "Embracing new ideas and technologies" },
      { icon: <Heart size={24} />, title: "Passion", description: "Loving what we do in every project" },
      { icon: <Target size={24} />, title: "Excellence", description: "Striving for the highest quality in all aspects" }
    ],
    team: [
      { name: "John Mugisha", role: "Principal Architect", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", bio: "20+ years of experience in commercial and residential architecture." },
      { name: "Sarah Nakato", role: "Senior Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", bio: "Specializes in sustainable design and green building practices." },
      { name: "David Ochieng", role: "Project Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", bio: "Expert in managing large-scale construction projects efficiently." }
    ],
    stats: [
      { icon: <Calendar size={32} />, value: "12+", label: "Years Experience" },
      { icon: <Building2 size={32} />, value: "150+", label: "Projects Completed" },
      { icon: <Users size={32} />, value: "25+", label: "Team Members" },
      { icon: <MapPin size={32} />, value: "5+", label: "Cities Served" }
    ],
    history: "Founded in 2012, Ergonomics has grown from a small design studio to a full-service architectural firm serving clients across Uganda and East Africa. Our journey began with a focus on residential projects and has expanded to include commercial, institutional, and hospitality architecture.",
    approach: "We believe in a collaborative approach to design, working closely with our clients to understand their vision, needs, and aspirations. Our process combines creative design thinking with technical expertise to deliver spaces that are both beautiful and functional."
  });

  const updateAboutData = (field, value) => {
    setAboutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About {siteContent.companyName}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {editMode ? (
              <textarea
                value={siteContent.description}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 text-center"
                rows="2"
              />
            ) : (
              siteContent.description
            )}
          </p>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            {editMode ? (
              <textarea
                value={aboutData.mission}
                onChange={(e) => updateAboutData('mission', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
              />
            ) : (
              <p className="text-gray-600">{aboutData.mission}</p>
            )}
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            {editMode ? (
              <textarea
                value={aboutData.vision}
                onChange={(e) => updateAboutData('vision', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
              />
            ) : (
              <p className="text-gray-600">{aboutData.vision}</p>
            )}
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <div className="space-y-4">
              {aboutData.values.map((value, index) => (
                <div key={index}>
                  {editMode ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => {
                          const newValues = [...aboutData.values];
                          newValues[index].title = e.target.value;
                          updateAboutData('values', newValues);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-1 text-sm font-semibold"
                      />
                      <input
                        type="text"
                        value={value.description}
                        onChange={(e) => {
                          const newValues = [...aboutData.values];
                          newValues[index].description = e.target.value;
                          updateAboutData('values', newValues);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-blue-600">{value.icon}</span>
                        <h4 className="font-semibold">{value.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{value.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...aboutData.stats];
                        newStats[index].value = e.target.value;
                        updateAboutData('stats', newStats);
                      }}
                      className="text-3xl font-bold text-gray-800 w-full text-center border border-gray-300 rounded px-2 py-1 mb-1"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...aboutData.stats];
                        newStats[index].label = e.target.value;
                        updateAboutData('stats', newStats);
                      }}
                      className="text-gray-600 w-full text-center border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold text-blue-800">
                      <AnimatedCounter end={parseInt(stat.value)} duration={2000} />+
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* History & Approach */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            {editMode ? (
              <textarea
                value={aboutData.history}
                onChange={(e) => updateAboutData('history', e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
                rows="6"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{aboutData.history}</p>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
            {editMode ? (
              <textarea
                value={aboutData.approach}
                onChange={(e) => updateAboutData('approach', e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
                rows="6"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{aboutData.approach}</p>
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  {editMode ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const newTeam = [...aboutData.team];
                          newTeam[index].name = e.target.value;
                          updateAboutData('team', newTeam);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-1 font-semibold text-lg"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const newTeam = [...aboutData.team];
                          newTeam[index].role = e.target.value;
                          updateAboutData('team', newTeam);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                      />
                      <textarea
                        value={member.bio}
                        onChange={(e) => {
                          const newTeam = [...aboutData.team];
                          newTeam[index].bio = e.target.value;
                          updateAboutData('team', newTeam);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                        rows="3"
                      />
                    </div>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                      <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <Award size={32} className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Uganda Architecture Award 2023</h4>
                  <p className="text-gray-600">Best Residential Design</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <Award size={32} className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">East African Design Excellence 2022</h4>
                  <p className="text-gray-600">Sustainable Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;