<?php

namespace App\Filament\Resources\MemberReports;

use App\Models\Member;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use App\Filament\Resources\MemberReports\Pages\ViewMemberReport;
use App\Filament\Resources\MemberReports\Pages\ListMemberReports;
use App\Filament\Resources\MemberReports\Tables\MemberReportsTable;
use App\Filament\Resources\MemberReports\Schemas\MemberReportInfolist;


class MemberReportResource extends Resource
{
    protected static ?string $model = Member::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    protected static ?string $navigationLabel = 'Members';

    protected static ?string $recordTitleAttribute = 'fullname';

    // ✅ ADD THIS (GROUPING)
    protected static string|\UnitEnum|null $navigationGroup = 'Member Panel';

    // ✅ ORDER (2nd position)
    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([]);
    }

    public static function table(Table $table): Table
    {
        return MemberReportsTable::configure($table);
    }
public static function infolist(Schema $schema): Schema
{
    return MemberReportInfolist::configure($schema);
}

    public static function getPages(): array
    {
        return [
            'index' => ListMemberReports::route('/'),
            'view' => ViewMemberReport::route('/{record}'),
        ];
    }

}