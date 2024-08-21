import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Location from "expo-location";

export default function TabTwoScreen() {
  const [location, setLocation] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("İzin verilmedi", "Konum erişim izni verilmedi.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      fetchPrayerTimes(loc.coords.latitude, loc.coords.longitude);
    })();

    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
      if (prayerTimes) {
        updateNextPrayerTime(date, prayerTimes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const fetchPrayerTimes = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      setPrayerTimes(data.data.timings);
      updateNextPrayerTime(new Date(), data.data.timings);
    } catch (error) {
      Alert.alert("Namaz vakitleri alınamadı", error.message);
    }
  };

  const updateNextPrayerTime = (currentDate, timings) => {
    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let nextPrayerTime = null;
    let nextPrayerName = "";

    for (let i = 0; i < prayerNames.length; i++) {
      const prayerTimeString = timings[prayerNames[i]];
      const [hours, minutes] = prayerTimeString.split(":").map(Number);
      const prayerTime = new Date(currentDate);
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime > currentDate) {
        nextPrayerTime = prayerTime;
        nextPrayerName = prayerNames[i];
        break;
      }
    }

    if (!nextPrayerTime) {
      // If all today's prayers have passed, get tomorrow's Fajr
      const nextFajrTimeString = timings.Fajr;
      const [hours, minutes] = nextFajrTimeString.split(":").map(Number);
      nextPrayerTime = new Date(currentDate);
      nextPrayerTime.setDate(currentDate.getDate() + 1);
      nextPrayerTime.setHours(hours, minutes, 0, 0);
      nextPrayerName = "Fajr";
    }

    setNextPrayer(nextPrayerName);
    const timeDiff = nextPrayerTime - currentDate;
    setTimeUntilNextPrayer(formatTimeUntilNextPrayer(timeDiff));
  };

  const formatTimeUntilNextPrayer = (timeDiff) => {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours} saat, ${minutes} dakika, ${seconds} saniye`;
  };

  if (!location || !prayerTimes) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRightCorner}>
        <Text style={styles.locationText}>
          {`Lat: ${location.coords.latitude.toFixed(
            2
          )}, Lon: ${location.coords.longitude.toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <Text style={styles.nextPrayerText}>
          {`Sonraki Vakit: ${nextPrayer}`}
        </Text>
        <Text style={styles.countdownText}>{timeUntilNextPrayer}</Text>
        <View style={styles.prayerTimesContainer}>
          <Text style={styles.prayerText}>Fajr: {prayerTimes.Fajr}</Text>
          <Text style={styles.prayerText}>Sunrise: {prayerTimes.Sunrise}</Text>
          <Text style={styles.prayerText}>Dhuhr: {prayerTimes.Dhuhr}</Text>
          <Text style={styles.prayerText}>Asr: {prayerTimes.Asr}</Text>
          <Text style={styles.prayerText}>Maghrib: {prayerTimes.Maghrib}</Text>
          <Text style={styles.prayerText}>Isha: {prayerTimes.Isha}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
  },
  loadingText: {
    fontSize: 24,
    color: "#F9D342",
  },
  topRightCorner: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  prayerTimesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  locationText: {
    color: "#9BA1A6",
    fontSize: 16,
  },
  timeText: {
    fontSize: 48,
    color: "#E8E8E8",
    textAlign: "center",
    marginBottom: 10,
  },
  nextPrayerText: {
    fontSize: 24,
    color: "#F9D342",
    marginTop: 10,
  },
  countdownText: {
    fontSize: 20,
    color: "#F9D342",
    marginTop: 5,
  },
  prayerText: {
    fontSize: 20,
    color: "#9BA1A6",
  },
});
