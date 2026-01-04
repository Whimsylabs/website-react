import React from "react";
import WelcomeSection from "./WelcomeSection";
import FeaturesSection from "./FeaturesSection";
import VideoPlayer from "./VideoPlayer";
import withTranslation from "./withTranslation";
// Video now served from public directory
// Video poster now served from public directory
import "./MainContent.css";
import Testimonial from "./Testimonial";
import Partners from "./Partners";
import BubbleContainer from "./BubbleContainer";
import SplashSection from "./SplashSection";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Footer from "./Footer";

const MainContent = ({ t, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />
      <WelcomeSection language={language} />
      <BubbleContainer>
        <VideoPlayer
          videoSrc="/videos/placeholder.webm"
          poster="/images/logo.png"
        />
      </BubbleContainer>
      <SplashSection>
        <FeaturesSection />
      </SplashSection>
      <BubbleContainer>
        <Testimonial />
        <h2>{t("home.trialDemo")}</h2>
        <ContactUs buttonText={t("home.applyTrial")} />
        <div className="faq-teaser">
          <h2>{t("home.haveQuestions")}</h2>
          <p>
            Visit our{" "}
            <a href="./faq/index.html" className="faq-link">
              {t("home.faqPage")}
            </a>{" "}
            for answers to common questions, or check our our{" "}
            <a
              href="https://storage.googleapis.com/phoenix-application-storage-fine-grained/Hyve/Bett/Bett2025/assets/USER_INPUT/d4ad42d1-e67a-44ff-9c8f-46d4b26622ea?ts=1734104814440"
              className="faq-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("home.featuresPDF")}
            </a>{" "}
            for more details about our virtual lab software!
          </p>
        </div>
      </BubbleContainer>
      <Partners />
      <Footer language={language} />
    </main>
  );
};

export default withTranslation(MainContent);
