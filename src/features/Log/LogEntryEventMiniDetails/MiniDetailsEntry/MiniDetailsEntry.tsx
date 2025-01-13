import { Group, parseThemeColor, Text, useMantineTheme } from '@mantine/core';

interface MiniDetailsEntryProps {
    icon: React.JSX.Element;
    title?: React.JSX.Element;
}

export const MiniDetailsEntry = (props: MiniDetailsEntryProps) => {
    const { icon, title } = props;
    const theme = useMantineTheme();

    return (
        <Group gap="0.25rem">
            <icon.type
                size={16}
                stroke={1.5}
                color={parseThemeColor({ color: 'dark.2', theme }).value}
                {...icon.props}
            />
            <Text c="dark.2">{title}</Text>
        </Group>
    );
};
