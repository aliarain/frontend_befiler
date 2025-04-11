import Footer from "../components/version3/common/Footer";
import Header from "../components/version3/common/Header";
import Navbar from "../components/version3/common/Navbar";

const Home2LayoutV3 = ({ children }) => (
    <div>
        <Header />
        <Navbar radius="100px" bgColor="#101928" />
        {children}
        <Footer bgColor="#15362C" />
    </div>
);

export default Home2LayoutV3;