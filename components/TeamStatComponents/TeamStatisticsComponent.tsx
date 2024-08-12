import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TeamStatisticsComponent = () => {
  return (
    <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>팀명</TableHead>
            <TableHead>승점</TableHead>
            <TableHead>최근경기기록</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>맨시티</TableCell>
            <TableCell>27</TableCell>
            <TableCell>네덜란드</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamStatisticsComponent;
