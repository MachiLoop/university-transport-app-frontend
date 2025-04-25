import { View, Text } from "react-native";
import { registerUser } from "../../utils/customFunctions/database";
import React, { useEffect, useState } from "react";
import TextInputForm from "../../components/TextInputForm";
import { Link, router } from "expo-router";
import CustomButton from "../../components/customButton";
import useToastNotification from "../../utils/customHooks/useToastNotification";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showToast = useToastNotification();
  const router = useRouter();

  const handleSignup = async () => {
    // console.log("hello");
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      showToast("All fields are required", "danger");
      return;
    } else if (form.password !== form.confirmPassword) {
      showToast("Passwords do not match", "danger");
      return;
    }

    const response = await registerUser(
      form.fullName,
      form.email.toLocaleLowerCase(),
      form.password
    );

    // console.log(response.status);

    if (response.data.errors) {
      setErrors(() => {
        return response.data.errors.reduce((acc, { field, message }) => {
          acc[field] = message;
          return acc;
        }, {});
      });
    }

    if (response.status == 201) {
      showToast(response.data.message, "success");
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.replace("/sign-in");
    }
  };

  return (
    <View className="px-4 flex-1 mt-12 justify-between">
      <View>
        <View className="gap-1">
          <Text className="text-3xl">Sign up Account</Text>
          <Text className="text-neutral-700">Create a new account</Text>
        </View>
        <View className="mt-10 gap-6">
          <TextInputForm
            title="Full Name"
            label="Full Name"
            value={form.fullName}
            handleChangeText={(e) => setForm({ ...form, fullName: e })}
            placeholder="Enter your name"
            labelStyles="font-psemibold"
            inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
            inputFieldStyles="flex-1"
          />
          <View>
            <TextInputForm
              title="Email"
              label="Email"
              value={form.email}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
                errors && setErrors({ ...errors, email: null });
              }}
              placeholder="Enter a valid e-mail address"
              labelStyles="font-psemibold"
              inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
              inputFieldStyles="flex-1"
            />
            {errors?.email && (
              <Text className="text-red-500">{errors.email}</Text>
            )}
          </View>
          <View>
            <TextInputForm
              title="Password"
              label="Password"
              value={form.password}
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
                errors & setErrors({ ...errors, password: null });
              }}
              placeholder="min of 8 characters"
              labelStyles="font-psemibold"
              inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
              inputFieldStyles="flex-1"
            />
            {errors?.password && (
              <Text className="text-red-500">{errors.password}</Text>
            )}
          </View>
          <TextInputForm
            title="Password"
            label="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            placeholder="Confirm your password"
            labelStyles="font-psemibold"
            inputContainerStyles="border-2 border-neutral-200 rounded-md flex-row items-center justify-between px-2"
            inputFieldStyles="flex-1"
          />
        </View>
        <CustomButton
          label="Sign up"
          containerStyles="bg-primary-700 py-4 rounded-md mt-4"
          textStyles="text-center text-shadeWhite font-pmedium"
          onPressHandler={handleSignup}
        />
      </View>
      <View className="flex-row gap-1 mb-12 items-center justify-center ">
        <Text className="font-psemibold">Have an account already?</Text>
        <Link href="/sign-up" className="text-primary-700 font-psemibold">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
