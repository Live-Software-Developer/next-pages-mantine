import {
    AppShell,
    MediaQuery,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SideNavbar from '../components/admin/common/SideNavbar';
import RightASide from '../components/admin/common/RightASide';
import CustomHeader from '../components/admin/common/CustomHeader';


interface AdminWrapperProps {
    children: React.ReactNode
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
    const [opened, { open, close }] = useDisclosure(false);


    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : BLUE_BG_COLOR,
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <SideNavbar close={close} opened={opened} />
            }
            // aside={
            //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //         <RightASide />
            //     </MediaQuery>
            // }
            header={
               <CustomHeader open={open} opened={opened} /> 
            }
        >
            <div style={{ minHeight: "90vh" }}>
                {children}
            </div>
        </AppShell>
    );
}