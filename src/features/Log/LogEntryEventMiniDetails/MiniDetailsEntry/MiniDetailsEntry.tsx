import { Group, parseThemeColor, Text, useMantineTheme } from '@mantine/core';

interface MiniDetailsEntryProps {
    icon: React.JSX.Element;
    title?: React.JSX.Element;
    size?: 'md' | 'sm';
}

export const MiniDetailsEntry = (props: MiniDetailsEntryProps) => {
    const { icon, title, size = 'md' } = props;
    const theme = useMantineTheme();

    return (
        <Group gap="0.25rem">
            <icon.type
                size={sizings[size].iconSize}
                stroke={1.5}
                color={parseThemeColor({ color: 'dark.2', theme }).value}
                {...icon.props}
            />
            <Text c="dark.2" fz={sizings[size].fontSize}>
                {title}
            </Text>
        </Group>
    );
};

const sizings = {
    md: {
        iconSize: 16,
        fontSize: 16,
    },
    sm: {
        iconSize: 14,
        fontSize: 14,
    },
};
