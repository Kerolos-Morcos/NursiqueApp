const WalkthroughAppConfig = {
  onboardingConfig: {
    walkthroughScreens: [
      {
        Image: require('../src/images/Healthprofessionalteam.gif'),
        title: "مرحبا بكم فى Nursigue",
        description: "نقدم العديد من الخدمات التمريضية",
      },
      {
        Image: require("../src/images/Healthprofessionalteam2.gif"),
        title: "تعليمى",
        description:
          "ستتعرف على بعض الحالات المرضية الشائعة وكيفية علاجها ",
      },
      {
        Image: require("../src/images/Nursinghome.gif"),
        title: "اخبارى",
        description: "اذا كنت ممرض سيتم اعلامك اذا طلبت للعمل من قبل احدى المرضى",
      },
    ],
  },
};

export default WalkthroughAppConfig;