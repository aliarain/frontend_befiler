import Footer from "../components/version3/common/Footer";
import Header from "../components/version3/common/Header";
import Navbar from "../components/version3/common/Navbar";

const Home3LayoutV3 = ({ children }) => (
    <div className="bg-[#101928]">
        <Header />
        <Navbar bgColor="#102D33"/>
        {children}
        <Footer bgColor="#15362C" />
    </div>
);

export default Home3LayoutV3;
