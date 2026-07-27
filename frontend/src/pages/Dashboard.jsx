import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import { StatusBadge } from "../components/StatusBadge";

import {
  getDashboardStats,
  getPredictions,
} from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_predictions: 0,
    today_predictions: 0,
    avg_confidence: 0,
    last_prediction_label: "No Predictions",
  });

  const [predictions, setPredictions] = useState([]);

  const [search, setSearch] = useState("");

  const [range, setRange] = useState("weekly");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const history = await getPredictions();

      const dashboardStats = await getDashboardStats();

      const today = new Date();

      const todayPredictions = history.filter((item) => {
        const d = new Date(item.created_at);

        return (
          d.getDate() === today.getDate() &&
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      });

      const avgConfidence =
        history.length === 0
          ? 0
          : (
              history.reduce(
                (sum, item) => sum + Number(item.confidence || 0),
                0
              ) / history.length
            ).toFixed(1);

      setStats({
        ...dashboardStats,
        today_predictions: todayPredictions.length,
        avg_confidence: avgConfidence,
      });

      setPredictions(history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredPredictions = useMemo(() => {
    return predictions.filter((item) => {
      const query = search.toLowerCase();

      return (
        item.prediction.toLowerCase().includes(query) ||
        item.filename.toLowerCase().includes(query)
      );
    });
  }, [predictions, search]);

  const recentPredictions = useMemo(() => {
    return predictions.slice(0, 5);
  }, [predictions]);

  const weeklyTrend = useMemo(() => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const counts = [0, 0, 0, 0, 0, 0, 0];

    predictions.forEach((item) => {
      const d = new Date(item.created_at);

      let day = d.getDay();

      day = day === 0 ? 6 : day - 1;

      counts[day]++;
    });

    return labels.map((day, index) => ({
      day,
      count: counts[index],
    }));
  }, [predictions]);

  const maxCount =
    Math.max(...weeklyTrend.map((d) => d.count), 1);

  const greeting = (() => {
    const h = new Date().getHours();

    if (h < 12) return "Good Morning";

    if (h < 17) return "Good Afternoon";

    return "Good Evening";
  })();

    return (
    <div className="text-on-surface min-h-screen flex flex-col">
      <AppHeader />

      <div className="flex pt-16 flex-1 min-h-screen">
        <Sidebar />

        <main className="flex-1 lg:ml-72 p-gutter max-w-content mx-auto w-full">

          {/* Header */}

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-md mb-xl">

            <div>

              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-base">
                {greeting}, {user?.name || "Doctor"}
              </h2>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Welcome back to your AI Medical Intelligence Dashboard.
              </p>

            </div>

            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-sm px-md py-sm rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition"
            >
              <Icon name="add_circle" />

              Analyze New Image
            </button>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="glass-card rounded-xl p-12 text-center">

              <Icon
                name="progress_activity"
                className="animate-spin mx-auto mb-md"
                size={40}
              />

              <p>Loading Dashboard...</p>

            </div>

          ) : (

            <>

              {/* ===================== */}
              {/* Statistics */}
              {/* ===================== */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md mb-xl">

                {/* Total */}

                <div className="glass-card rounded-xl p-md">

                  <div className="flex justify-between">

                    <Icon
                      name="analytics"
                      className="text-primary"
                    />

                    <span className="text-primary text-xs">
                      Total
                    </span>

                  </div>

                  <p className="mt-md text-sm text-on-surface-variant">
                    Total Predictions
                  </p>

                  <h2 className="text-3xl font-bold mt-sm">
                    {stats.total_predictions}
                  </h2>

                </div>

                {/* Today */}

                <div className="glass-card rounded-xl p-md">

                  <div className="flex justify-between">

                    <Icon
                      name="today"
                      className="text-secondary"
                    />

                    <span className="text-secondary text-xs">
                      Today
                    </span>

                  </div>

                  <p className="mt-md text-sm text-on-surface-variant">
                    Today's Predictions
                  </p>

                  <h2 className="text-3xl font-bold mt-sm">
                    {stats.today_predictions}
                  </h2>

                </div>

                {/* Confidence */}

                <div className="glass-card rounded-xl p-md">

                  <div className="flex justify-between">

                    <Icon
                      name="verified"
                      className="text-green-500"
                    />

                    <span className="text-green-500 text-xs">
                      Average
                    </span>

                  </div>

                  <p className="mt-md text-sm text-on-surface-variant">
                    Average Confidence
                  </p>

                  <h2 className="text-3xl font-bold mt-sm">
                    {stats.avg_confidence}%
                  </h2>

                </div>

                {/* Last */}

                <div className="glass-card rounded-xl p-md">

                  <div className="flex justify-between">

                    <Icon
                      name="history"
                      className="text-tertiary"
                    />

                    <span className="text-tertiary text-xs">
                      Latest
                    </span>

                  </div>

                  <p className="mt-md text-sm text-on-surface-variant">
                    Last Prediction
                  </p>

                  <h2 className="text-xl font-semibold mt-sm line-clamp-2">

                    {stats.last_prediction_label}

                  </h2>

                </div>

              </div>

              {/* ===================== */}
              {/* Trend Chart */}
              {/* ===================== */}

              <div className="glass-card rounded-xl mb-xl overflow-hidden">

                <div className="border-b border-outline-variant/20 p-md flex justify-between items-center">

                  <div>

                    <h3 className="font-headline-md">
                      Weekly Prediction Trend
                    </h3>

                    <p className="text-body-sm text-on-surface-variant">

                      Generated from your prediction history

                    </p>

                  </div>

                  <div className="flex gap-sm">

                    <button
                      onClick={() => setRange("weekly")}
                      className={`px-md py-xs rounded-lg ${
                        range === "weekly"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container"
                      }`}
                    >
                      Weekly
                    </button>

                  </div>

                </div>

                <div className="relative h-72 px-lg pt-lg">

                  <div className="absolute inset-0 flex items-end justify-between px-lg pb-10">

                    {weeklyTrend.map((item) => (

                      <div
                        key={item.day}
                        className="w-full mx-1 bg-primary rounded-t-lg transition-all"
                        style={{
                          height: `${Math.max(
                            (item.count / maxCount) * 100,
                            6
                          )}%`,
                        }}
                      >

                        <div className="text-center text-xs -mt-6 font-semibold">

                          {item.count}

                        </div>

                      </div>

                    ))}

                  </div>

                  <div className="absolute bottom-2 left-0 w-full flex justify-between px-lg text-xs font-semibold text-on-surface-variant">

                    {weeklyTrend.map((item) => (

                      <span key={item.day}>
                        {item.day}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              {/* ===================== */}
              {/* Recent Activity */}
              {/* ===================== */}

              <div className="glass-card rounded-xl mb-xl overflow-hidden">

                <div className="p-md border-b border-outline-variant/20">

                  <h3 className="font-headline-md">
                    Recent Predictions
                  </h3>

                  <p className="text-body-sm text-on-surface-variant">
                    Your latest AI-assisted analyses
                  </p>

                </div>

                <div>

                  {recentPredictions.length === 0 ? (

                    <div className="p-lg text-center text-on-surface-variant">

                      No predictions available.

                    </div>

                  ) : (

                    recentPredictions.map((item) => (

                      <div
                        key={item.id}
                        className="border-b border-outline-variant/10 p-md hover:bg-surface-container-low transition"
                      >

                        <div className="flex justify-between items-start">

                          <div>

                            <h4 className="font-semibold">

                              {item.prediction}

                            </h4>

                            <p className="text-sm text-on-surface-variant">

                              {item.filename}

                            </p>

                            <p className="text-xs text-on-surface-variant mt-1">

                              {new Date(item.created_at).toLocaleString()}

                            </p>

                          </div>

                          <div className="text-right">

                            <div className="font-semibold">

                              {(Number(item.confidence) || 0).toFixed(1)}%

                            </div>

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>

              {/* ===================== */}
              {/* Prediction History */}
              {/* ===================== */}

              <div className="glass-card rounded-xl overflow-hidden">

                <div className="p-md border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-md">

                  <div>

                    <h3 className="font-headline-md">
                      Prediction History
                    </h3>

                    <p className="text-body-sm text-on-surface-variant">

                      Search your previous analyses

                    </p>

                  </div>

                  <input
                    type="text"
                    placeholder="Search prediction..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-md py-sm rounded-lg bg-surface-container w-full md:w-72"
                  />

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="bg-surface-container-low">

                        <th className="text-left px-md py-sm">
                          Prediction
                        </th>

                        <th className="text-left px-md py-sm">
                          Filename
                        </th>

                        <th className="text-left px-md py-sm">
                          Confidence
                        </th>

                        <th className="text-left px-md py-sm">
                          Created
                        </th>

                        <th className="text-center px-md py-sm">
                          Report
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredPredictions.length === 0 ? (

                        <tr>

                          <td
                            colSpan={5}
                            className="text-center py-xl text-on-surface-variant"
                          >

                            No prediction history found.

                          </td>

                        </tr>

                      ) : (

                        filteredPredictions.map((item) => (

                          <tr
                            key={item.id}
                            className="border-t border-outline-variant/10 hover:bg-surface-container-low"
                          >

                            <td className="px-md py-md">

                              <div className="font-medium">

                                {item.prediction}

                              </div>

                            </td>

                            <td className="px-md py-md">

                              {item.filename}

                            </td>

                            <td className="px-md py-md">

                              <div className="flex items-center gap-sm">

                                <div className="w-28 h-2 rounded-full bg-surface-container overflow-hidden">

                                  <div
                                    className="bg-primary h-full"
                                    style={{
                                      width: `${item.confidence}%`,
                                    }}
                                  />

                                </div>

                                {(Number(item.confidence) || 0).toFixed(1)}%

                              </div>

                            </td>

                            <td className="px-md py-md">

                              {new Date(
                                item.created_at
                              ).toLocaleString()}

                            </td>

                            <td className="text-center px-md py-md">

                              <Link
                                to={`/results/${item.id}`}
                                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-surface-container"
                              >

                                <Icon name="open_in_new" />

                              </Link>

                            </td>

                          </tr>

                        ))

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </>

          )}

        </main>

      </div>

      <div className="lg:ml-72">

        <Footer />

      </div>

    </div>

  );

}