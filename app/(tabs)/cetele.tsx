import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

// Firebase service functions
export const signUp = async (email, password, role) => {
  try {
    // Create user with email and password in Firebase Authentication
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    // Save the user role in Firestore under 'users' collection
    await firestore().collection("users").doc(userId).set({
      email: email,
      role: role,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    // Return the created user object
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

    // Save the user role in Firestore
    await firestore().collection("users").doc(userId).set({
      email,
      role,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userDoc = await firestore().collection("users").doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data().role;
    } else {
      throw new Error("No such user!");
    }
  } catch (error) {
    console.error("Error fetching user role: ", error);
    throw error;
  }
};

// Main Application Component
function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      }
    };
    checkUserRole();
  }, [user]);

  const handleSignIn = async () => {
    try {
      const signedInUser = await signIn("student@example.com", "password123");
      setUser(signedInUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.email}!</Text>
          <Text>Your role: {role}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
          {role && <TaskTrackingScreen user={{ ...user, role }} />}
        </>
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}
    </View>
  );
}

// Task Tracking Component
function TaskTrackingScreen({ user }) {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    // Sample structure for tasks
    const tasks = [
      {
        id: "1",
        title: "Task 1",
        description: "Complete assignment",
        status: "Pending",
        assignedTo: "student1",
        mentor: "mentor1",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Prepare presentation",
        status: "In Progress",
        assignedTo: "student2",
        mentor: "mentor2",
      },
      // More tasks...
    ];

    // Filter tasks based on the user's role
    if (user.role === "student") {
      setUserTasks(tasks.filter((task) => task.assignedTo === user.uid));
    } else if (user.role === "mentor") {
      setUserTasks(tasks.filter((task) => task.mentor === user.uid));
    }
  }, [user]);

  const handleTaskUpdate = (taskId, newStatus) => {
    // Update the task status
    const updatedTasks = userTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setUserTasks(updatedTasks);

    // Notify the mentor
    if (user.role === "student") {
      Alert.alert("Task Updated", `The mentor will be notified.`);
      // Implement notification logic here
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userTasks}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            {user.role === "student" && (
              <TouchableOpacity
                onPress={() => handleTaskUpdate(item.id, "Completed")}
              >
                <Text style={styles.button}>Mark as Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  task: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  button: {
    color: "blue",
    marginTop: 10,
  },
});
