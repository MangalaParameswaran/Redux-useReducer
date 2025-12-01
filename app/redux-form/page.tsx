'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { setField, resetField } from "../services/formSlice";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function FormPage() {
    const state = useSelector((state: any) => state.reduxForm);
    const dispatch = useDispatch();
    const router= useRouter();
    const [isMounted, setIsMounted] = useState(false);

    // ensure component only renders after client mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
        gender: Yup.string().required("Gender is required"),
        courses: Yup.array().min(1, "Select at least one course"),
        country: Yup.string()
    });

    const formik = useFormik({
        initialValues: state,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log("Redux Form Submitted:----------", values);
            dispatch(resetField());
            toast.success('Redux form submitted successfully')
        }
    });

    const handleChange = (e: any) => {
        const { name, type, value, checked } = e.target;
        if (type === "checkbox") {
            let updated = [...formik.values[name]];

            if (checked) {
                updated.push(value);
            } 
            // else {
            //     updated = updated.filter((v) => v !== value);
            // }

            formik.setFieldValue(name, updated);
            dispatch(setField({ field: name, value: updated }));
            return;
        }

        // normal input fields (text, email, radio, select)
        formik.handleChange(e);
        dispatch(setField({ field: name, value }));
    };

    const renderError = (error: any) => {
        if (!error) return null;
        console.log('typeof error---', typeof error, error)
        return typeof error === "string" ? error : JSON.stringify(error);
    };

    if (!isMounted) return null;
    const coursesList = [
        { label: "React", value: "react" },
        { label: "Angular", value: "angular" },
        { label: "Vue", value: "vue" },
        { label: "Next.js", value: "next" },
    ];


    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Redux Toolkit Form</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Name *</label>
                        <input
                            name="name"
                            value={formik.values.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200"
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {formik.touched.name && renderError(formik.errors.name)}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Email *</label>
                        <input
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={handleChange}
                            className="dark:text-gray-200 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {formik.touched.email && renderError(formik.errors.email)}
                        </p>

                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold ">Password *</label>
                        <input
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                        <p className="text-red-500 text-sm mt-1">
                            {formik.touched.password && renderError(formik.errors.password)}
                        </p>

                    </div>

                    {/* Gender */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Gender *</label>
                        <div className="flex gap-4 items-center">
                            <label className="flex items-center gap-1 dark:text-gray-400">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formik.values.gender === "male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label className="flex items-center gap-1 dark:text-gray-400">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formik.values.gender === "female"}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                        <p className="text-red-500 text-sm mt-1">
                            {formik.touched.gender && renderError(formik.errors.gender)}
                        </p>

                    </div>

                    {/* Courses */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">
                            Courses *
                        </label>

                        <div className="flex flex-row gap-4">
                            {coursesList.map((course) => (
                                <label key={course.value} className="flex items-center gap-2 dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        name="courses"
                                        value={course.value}
                                        checked={formik.values.courses.includes(course.value)}
                                        onChange={handleChange}
                                    />
                                    {course.label}
                                </label>
                            ))}
                        </div>

                        <p className="text-red-500 text-sm mt-1">
                            {formik.touched.courses && renderError(formik.errors.courses)}
                        </p>
                    </div>


                    {/* Country */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Country</label>
                        <select
                            name="country"
                            value={formik.values.country}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400">
                            <option value="">Select Country</option>
                            <option value="india">India</option>
                            <option value="usa">USA</option>
                            <option value="uk">UK</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-row justify-center gap-5 mt-2">
                    <button type="submit" className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={(!formik.isValid) && (!formik.dirty)}>
                        Submit
                    </button>
                     <button onClick={()=> router.push('/')}
                     className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" >
                        back
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
