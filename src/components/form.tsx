import { useForm } from "react-hook-form";
import { createTranslator } from "@/lib/utils";
import { useRouter } from "next/router";

async function submitContactForm(data: any) {
  const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const formData = new FormData();
  formData.append("your-name", data.name);
  formData.append("your-email", data.email);
  formData.append("your-message", data.message || "");
  formData.append("_wpcf7_unit_tag", "wpcf7-f26b1977-123");

  try {
    const response = await fetch(
      `${backendDomain}/wp-json/contact-form-7/v1/contact-forms/104/feedback`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response:", errorData);
      throw new Error(errorData.message || "Submission failed");
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(errorMessage);
  }
}

export default function ContactForm({ translations }: { translations: any }) {
  const t = createTranslator(translations);
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await submitContactForm(data);
      // alert(t("form.success"));
      reset();
      const isDefaultLocale = locale === defaultLocale;
      router.push("/success/", "/success/", {
        locale: isDefaultLocale ? undefined : locale,
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          {t("form.nameLabel")}
        </label>
        <input
          id="name"
          {...register("name", {
            required: t("form.textRequired"),
            minLength: { value: 2, message: t("form.nameMinLength") },
          })}
          className="w-full p-2 border rounded-lg focus:outline-none"
          placeholder={t("form.namePlaceholder")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          {t("form.emailLabel")}
        </label>
        <input
          id="email"
          {...register("email", {
            required: t("form.textRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              message: t("form.formatInvalid"),
            },
          })}
          className="w-full p-2 border rounded-lg focus:outline-none"
          placeholder={t("form.emailPlaceholder")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          {t("form.messageLabel")}
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="w-full p-2 border rounded-lg focus:outline-none resize-none"
          placeholder={t("form.messagePlaceholder")}
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
      >
        {isSubmitting ? t("form.sending") : t("form.send")}
      </button>
    </form>
  );
}
