import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

export default function CalculationTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`calculation-tabpanel-${index}`}
            aria-labelledby={`calculation-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}
