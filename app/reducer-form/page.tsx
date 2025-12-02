'use client'
import React, { useEffect, useReducer, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { initialState, formReducer } from "../services/reducer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";


export default function ReducerFormPage() {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const router = useRouter();
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        gender: Yup.string().required("Gender is required"),
        courses: Yup.array().min(1, "Select at least one course"),
        country: Yup.string(), // not required
    });

    const formik = useFormik({
        initialValues: state,
        validationSchema,
        // enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
            dispatch({ type: "RESET" });
            toast.success('useReduce hook form submitted successfully')
        },
    });

    // Sync Formik changes to reducer
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        let dispatchData;
        if (type === "checkbox") {
            let updated = [...formik.values[name]];

            if (checked) {
                updated.push(value);
            }
            // else {
            //     updated = updated.filter((v) => v !== value);
            // }

            formik.setFieldValue(name, updated);
            dispatchData = { type: "SET_FIELD", field: name, value: updated };
            dispatch(dispatchData);
            return;
        }
        dispatchData = { type: "SET_FIELD", field: name, value }
        console.log('dispatcdata----', dispatchData);
        dispatch(dispatchData);
        formik.handleChange(e);
    };

    const renderError = (error: any) => {
        if (!error) return null;
        return typeof error === "string" ? error : JSON.stringify(error);
    };

    const coursesList = [
        { label: "React", value: "react" },
        { label: "Angular", value: "angular" },
        { label: "Vue", value: "vue" },
        { label: "Next.js", value: "next" },
    ];
    if (!isMount) return null;
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <div className="dark:bg-gray-800 bg-white p-8 rounded-xl shadow-md w-full max-w-md">`
                    <h1 className="text-2xl font-bold text-white text-center">useReducer hook</h1>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Name *</label>
                            <input name="name" value={formik.values.name} onChange={handleChange} onBlur={formik.handleBlur} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200" />
                            <p className="text-red-500 text-sm mt-1">
                                {formik.touched.name && renderError(formik.errors.name)}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Email *</label>
                            <input name="email" type="email" value={formik.values.email} onChange={handleChange} onBlur={formik.handleBlur}// formik’s touched updates only on: onBlur 🤦‍♂️ OR if you call formik.handleBlur
                                className="dark:text-gray-200 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <p className="text-red-500 text-sm mt-1">
                                {formik.touched.email && renderError(formik.errors.email)}
                            </p>

                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold ">Password *</label>
                            <input name="password" type="password" value={formik.values.password} onChange={handleChange} onBlur={formik.handleBlur} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                            <p className="text-red-500 text-sm mt-1">
                                {formik.touched.password && renderError(formik.errors.password)}
                            </p>

                        </div>

                        {/* Gender */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-gray-700 dark:text-gray-200 font-semibold">Gender *</label>
                            <div className="flex gap-4 items-center">
                                <label className="flex items-center gap-1 dark:text-gray-400">
                                    <input type="radio" name="gender" value="male" checked={formik.values.gender === "male"} onBlur={formik.handleBlur} onChange={handleChange} />
                                    Male
                                </label>
                                <label className="flex items-center gap-1 dark:text-gray-400">
                                    <input type="radio" name="gender" value="female" checked={formik.values.gender === "female"} onBlur={formik.handleBlur} onChange={handleChange} />
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
                                        <input type="checkbox" name="courses" value={course.value} checked={formik.values.courses.includes(course.value)} onChange={handleChange} />
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
                            <select name="country" value={formik.values.country} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400">
                                <option value="">Select Country</option>
                                <option value="india">India</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-row justify-center gap-5 mt-2">
                            <button type="submit" className="bg-blue-600 text-white py-2 px-3 rounded hover:cursor-pointer hover:bg-blue-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!formik.isValid || !formik.dirty}>
                                Submit
                            </button>
                            <button onClick={() => {
                                formik.resetForm({
                                    values: initialState,
                                    touched: {},
                                    errors: {},
                                });
                                dispatch({ type: 'RESET' })
                            }}
                                className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed hover:cursor-pointer" >
                                Reset
                            </button>
                        </div>
                        <Link href={'/'} className="text-blue-500">Back to home?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}