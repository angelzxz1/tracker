import { currentProfile } from "@/lib/current-profile";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

export const Spent = async () => {
    const user = await currentProfile();
    if (user) {
        const { currentDay, currentMonth, currentWeek, currentYear } = user;
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-medium text-center">
                            Criteria
                        </TableHead>
                        <TableHead className="text-center">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-lg">
                    <TableRow>
                        <TableCell className="font-medium text-center">
                            Today
                        </TableCell>
                        <TableCell className="text-center">
                            {formatCurrency(currentDay)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-center">
                            This Week
                        </TableCell>
                        <TableCell className="text-center">
                            {formatCurrency(currentWeek)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-center">
                            This Month
                        </TableCell>
                        <TableCell className="text-center">
                            {formatCurrency(currentMonth)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-center">
                            This Year
                        </TableCell>
                        <TableCell className="text-center">
                            {formatCurrency(currentYear)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
    return <></>;
};
