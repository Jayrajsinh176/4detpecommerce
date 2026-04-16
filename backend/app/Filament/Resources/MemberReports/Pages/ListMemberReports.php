<?php

namespace App\Filament\Resources\MemberReports\Pages;

use App\Filament\Resources\MemberReports\MemberReportResource;
use Filament\Resources\Pages\ListRecords;

class ListMemberReports extends ListRecords
{
    protected static string $resource = MemberReportResource::class;

    protected function getHeaderActions(): array
    {
        return []; // no create button
    }
}