import { Input } from '@/components/ui/Form/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, List } from 'lucide-react';

interface GuidesFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  categories: string[];
  viewMode: 'card' | 'list';
  setViewMode: (value: 'card' | 'list') => void;
}

export const GuidesFilters = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  categories,
  viewMode,
  setViewMode,
}: GuidesFiltersProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-sans"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="font-sans">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category} className="font-sans">
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-border rounded-lg p-1">
          <Button
            variant={viewMode === 'card' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('card')}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

