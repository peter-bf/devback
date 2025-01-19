"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserCard from "./UserCard";
import { fetchDevelopers } from "@/lib/api";

const TrendingSection = () => {
  const [trendingDevelopers, setTrendingDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingDevelopers = async () => {
      try {
        console.log("Fetching top 4 trending developers...");
        const developers = await fetchDevelopers();
        console.log("Fetched developers:", developers);
        const sortedDevelopers = developers.slice(100, 104); // Picks developers from index 11-14
        console.log("Selected developers:", sortedDevelopers);
        console.log("Fetched developers:", sortedDevelopers);
        setTrendingDevelopers(sortedDevelopers);
        setLoading(false);
      } catch (err) {
        console.error("Error in TrendingSection:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrendingDevelopers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6">Trending Devs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingDevelopers.map((developer) => (
          <UserCard key={developer.dev_id} user={developer} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/search" className="text-blue-400 hover:text-blue-300">
          Find more devs
        </Link>
      </div>
    </section>
  );
};

export default TrendingSection;
