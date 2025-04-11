import Footer from "../components/version2/common/footer";
import Header from "../components/version2/common/header";

const HomeLayoutV2 = ({ children }) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);

export default HomeLayoutV2;