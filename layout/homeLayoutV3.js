import Footer from "../components/version3/common/Footer";
import Header from "../components/version3/common/Header";
import Navbar from "../components/version3/common/Navbar";

const HomeLayoutV3 = ({ children }) => (
    <div>
        <Header />
        <Navbar />
        {children}
        <Footer bgColor="#101928" />
    </div>
);

export default HomeLayoutV3;